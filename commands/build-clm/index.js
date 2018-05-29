#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const {paths} = require('../../lib/config');
const {log, done, info, logWithSpinner, stopSpinner} = require('@vue/cli-shared-utils');
let {structure, languages} = require(paths.clm.config);

module.exports = async (api, projectOptions, args) => {
  args = parseArgs(args);
  const slidesToBuild = getFilteredSlidesToBuild(args.filter);

  console.log(slidesToBuild);

  /** Run Build **/
  await runBuild(api, projectOptions, args, structure);


  /** Finish Build **/
  done('Build complete');
  killAllNodeProcesses();
};

async function runBuild(api, projectOptions, args, structure) {
  info(`Building for ${chalk.yellow(Object.keys(args.clm).join(', '))}.`);
  if (Object.keys(args.options).length) info(`Options: ${chalk.green(Object.keys(args.options).join(', '))}`);
  if (args.filter) info(`Filter: ${chalk.green(args.filter)}`);

  /** Create screens **/
  if (!args.options['no-screens']) await require('../../lib/screens-maker')(structure);

  /** Webpack build for necessary CLM-systems **/
  process.env.NODE_ENV = 'production';

  for (let clm of Object.keys(args.clm)) {
    await require(`./build-${clm}`)(api, projectOptions, structure)
  }
}

/**
 * Parse and validate args
 *
 * @param args
 */
function parseArgs(args) {
  // Valid commands and options
  const commands = {
    clm: {
      'pt': 'pharma-touch',
      'mt': 'mi-touch',
      'v': 'veeva'
    },
    options: {
      'ns': 'no-screens',
      'nca': 'no-clear-assets'
    },
    filter: ''
  };

  // arg 'clm' is required
  args.clm = args.clm || args.c;
  if (!args.clm || !args.clm.length) {
    console.log(chalk.red('Missing required command "--clm=[options]" or "-c=[options]"'));
    process.exit(0);
  }

  const result = {};

  for (let command in commands) {
    // Command can be long '--clm' or short '-c'
    args[command] = args[command] || args[command[0]];
    // Set validated commands to necessary key in 'result'
    result[command] = {};

    // filter can be any string value
    if (command === 'filter') {
      result[command] = new RegExp(args[command], 'i')
    }

    for (const key in  commands[command]) {
      const optionShort = key;
      const optionLong = commands[command][optionShort];

      if (typeof args[command] === "string") {
        const commandOptions = args[command].split(',');

        if (commandOptions.includes(optionShort) || commandOptions.includes(optionLong)) {
          result[command][optionLong] = true
        }
      }
    }
  }

  return result;
}

function getFilteredSlidesToBuild(filter) {
  const slidesToBuild = [];
  console.log(filter);

  languages.forEach(lang => {
    structure.forEach(sl => {
      if (filter.test(sl.id) && filter.test(lang)) {
        slidesToBuild.push({
          id: sl.id,
          path: sl.path,
          name: typeof sl.name === 'string' ? sl.name : sl.name[lang],
          lang
        })
      }
    })
  });

  return slidesToBuild;
}

function killAllNodeProcesses() {
  const {exec} = require('child_process');
  const os = require('os');

  if (os.platform() === 'win32') {
    exec(`taskkill -F -IM node.exe`)
  }
}
