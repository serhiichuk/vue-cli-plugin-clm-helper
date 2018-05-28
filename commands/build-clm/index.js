#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const {paths} = require('../../lib/config');


module.exports = async (api, projectOptions, args) => {
  const commands = parseArgs(args);

  /** Run Build **/
  await runBuild(commands);
};

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
    }
  };

  // arg 'clm' is required
  args.clm = args.clm || args.c;
  if (!args.clm || !args.clm.length) {
    console.log(chalk.red('Missing required command "--clm=[options]" or "-c=[options]"'));
    process.exit(0);
  }

  // Set validated commands to 'args.commands'
  const result = {};

  for (let command in commands) {
    // Command can be long '--clm' or short '-c'
    args[command] = args[command] || args[command[0]];

    for (const key in  commands[command]) {
      const optionShort = key;
      const optionLong = commands[command][optionShort];

      if (typeof args[command] === "string") {
        const commandOptions = args[command].split(',');

        if (commandOptions.includes(optionShort) || commandOptions.includes(optionLong)) {
          result[command] = {};
          result[command][optionLong] = true
        }
      }
    }
  }

  return result;
}

async function runBuild({clm, options = {}}) {
  const {
    log,
    done,
    info,
    logWithSpinner,
    stopSpinner
  } = require('@vue/cli-shared-utils');

  let buildInfo = `Building for ${chalk.yellow(Object.keys(clm).join(', '))}`;
  if (Object.keys(options).length) {
    buildInfo += `, with options: ${chalk.cyan(Object.keys(options).join(', '))}`;
  }

  log();
  logWithSpinner(buildInfo);

  /** Create screens **/
  if (!options['no-screens']) await require('../../lib/screens-maker')();

  /** Webpack build for necessary CLM-systems **/
  // const {clm, structure} = require(paths.clm.config);
  // const webpackSlideBuild = require('../../lib/webpack-slide-builder');

  // const startConfig = api.resolveWebpackConfig();
  //
  // for (let sl of structure) {
  //   console.log('build', sl.path);
  //   process.env.VUE_APP_SL_ID = sl.id;
  //   process.env.VUE_APP_SL_PATH = sl.path;
  //   process.env.VUE_APP_OUT_DIR_NAME = sl.id;
  //   process.env.VUE_APP_OUT_HTML_NAME = `${clm.productID}_${sl.id}`;
  //
  //   await webpackSlideBuild(api, projectOptions, startConfig)
  // }

  log();
  done('Build complete');
  process.exit(0)
}
