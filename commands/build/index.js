#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const {paths} = require('../../lib/config');


module.exports = async (api, projectOptions, args) => {
  /**
   * Parse and validate args
   */

    // Valid commands and options
  const commands = {
      clm: {
        'PT': 'pharma-touch',
        'MT': 'mi-touch',
        'V': 'veeva'
      },
      options: {
        'NS': 'no-screens',
        'NCA': 'no-clear-assets'
      }
    };

  // arg 'clm' is required
  if (!args.clm) {
    console.log(chalk.red('Missing required command "--clm=[options]"'));
    process.exit(0);
  }

  // Set validated commands to '_args'
  const _args = {clm: {}, options: {}};
  for (const command in commands) for (const optionShort in  commands[command]) {
    const optionLong = commands[command][optionShort];
    const commandOptions = args[command].split(',');

    if (commandOptions.includes(optionShort) || commandOptions.includes(optionLong)) {
      _args[command][optionLong] = true
    }
  }


  /**
   * Run Build
   */

  const {
    log,
    done,
    info,
    logWithSpinner,
    stopSpinner
  } = require('@vue/cli-shared-utils');

  log();
  logWithSpinner(`Building for [${Object.keys(_args.clm).join(', ')}] with options: [${Object.keys(_args.options).join(', ')}] ...`);

  /** Create screens **/
  if (!_args['no-screens']) await require('../../lib/screens-maker')(api, projectOptions);

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
};
