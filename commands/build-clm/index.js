#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {paths} = require('../../lib/config');
const {log, done, info, logWithSpinner, stopSpinner, error} = require('@vue/cli-shared-utils');
let {structure, languages} = require(paths.clm.config);
const parseArgs = require('../../lib/util/parse-args');

module.exports = async (api, projectOptions, args) => {
  // Valid commands and options
  args = parseArgs(args, {
    clm: {
      'pt': 'pharma-touch',
      'mt': 'mi-touch',
      'v': 'veeva'
    },
    options: {
      'ns': 'no-screens',
      'nca': 'no-clear-assets'
    },
    filter: '',
    lang: ''
  });

  // arg 'clm' is required
  if (!Object.keys(args.clm).length) {
    error('Missing required command "--clm=[options]" or "-c=[options]"');
    process.exit(0);
  }

  // check on screens exist
  if (!fs.existsSync(paths.screens) && (args.options['no-screens'])) {
    error('You can\'t use option "no-screens" when "screens" folder is\'t exist.');
    process.exit(0);
  }

  const slidesToBuild = getFilteredSlidesToBuild(args);

  /** Run Build **/
  await runBuild(api, projectOptions, args, slidesToBuild);

  /** Finish Build **/
  showConclusion(args, slidesToBuild);
  killAllNodeProcesses();
};


async function runBuild(api, projectOptions, args, slidesToBuild) {
  info(`Building for ${chalk.yellow(Object.keys(args.clm).join(', '))}.`);
  if (Object.keys(args.options).length) {
    info(`Options: ${chalk.green(Object.keys(args.options).join(', '))}`);
  }
  if (!args.filter.test('')) {
    info(`ID filter: ${chalk.green(args.filter)}`);
  }

  if (!args.lang.test('')) {
    info(`Lang filter: ${chalk.green(args.lang)}`);
  }

  /** Create screens **/
  if (!args.options['no-screens']) await require('../../lib/screens-maker')(slidesToBuild);

  /** Webpack build for necessary CLM-systems **/
  logWithSpinner('Building slides...');
  process.env.NODE_ENV = 'production';

  for (let clm of Object.keys(args.clm)) {
    await require(`./build-${clm}`)(api, projectOptions, args, slidesToBuild, clm)
  }

  return new Promise(resolve => resolve())
}

function showConclusion({filter, lang}, slidesToBuild) {
  stopSpinner();
  log();
  done('Build complete.');

  if (!filter.test('')) {
    info('Built slides:');
    console.log('\tLang\t\t| ID');
    console.log('\t--------------------');
    console.log(slidesToBuild.map(sl => `\t${chalk.green(sl.id)}\t| ${chalk.yellow(sl.lang)}`).join('\n'))
  }

  info(`You can find archives in ${chalk.green(paths.zip)}`);
}

function getFilteredSlidesToBuild({filter, lang}) {
  const slidesToBuild = [];
  const hasLangFilter = lang.test(languages.toString());

  const slElementSchema = (sl, lang) => ({
    id: sl.id,
    path: sl.path,
    name: typeof sl.name === 'string' ? sl.name : sl.name[lang],
    lang
  });

  languages.forEach(slideLang => {
    structure.forEach(sl => {
      if (hasLangFilter) {
        if (filter.test(sl.id) && lang.test(slideLang)) slidesToBuild.push(slElementSchema(sl, slideLang))
      } else {
        if (filter.test(sl.id)) slidesToBuild.push(slElementSchema(sl, slideLang))
      }
    })
  });

  return slidesToBuild;
}

function killAllNodeProcesses() {
  const {exec} = require('child_process');
  const os = require('os');

  if (os.platform() === 'win32') {
    exec(`taskkill -F -IM node.exe`);
    process.exit(0);
  }
}
