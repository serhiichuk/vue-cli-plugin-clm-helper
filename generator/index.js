#!/usr/bin/env node
const fsExtra = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const {hasYarn} = require('@vue/cli-shared-utils');


module.exports = (api, options, rootOptions) => {

  // modify package.json fields
  api.extendPackage({
    scripts: {
      build: 'vue-cli-service build-clm',
      'build-standard': 'vue-cli-service build',
      // data: 'vue-cli-service data',
      dev: 'vue-cli-service serve',
      generate: 'vue-cli-service generate'
    },
    dependencies: {
      'qrcode-generator': "^1.4.0",
      'veevalibrary': "^4.0.8"
    },
    devDependencies: {
      // "node-sass": "^4.9.0",
      // "sass-loader": "^7.0.1"
    }
  });

  // copy and render all files in ./template with ejs
  api.render('./template');


  // clear src and copy clm-template
  api.onCreateComplete(() => {
    const src = api.resolve('src');

    fsExtra.emptydirSync(src);
    fsExtra.copySync(path.resolve(__dirname, 'template/src'), src);
  });

  // show info after complete
  const command = (command) => hasYarn()
    ? chalk.green(`yarn ${command}`)
    : chalk.green(`npm ${command}`);

  api.exitLog(`To Development: ${command('dev')}. To build: ${command('build --help')}`);
};
