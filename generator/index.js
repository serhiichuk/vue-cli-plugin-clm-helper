const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const {hasYarn} = require('@vue/cli-shared-utils');

module.exports = (api, options) => {

  // modify package.json fields
  api.extendPackage({
    scripts: {
      build: 'vue-cli-service build-clm',
      'build-standard': 'vue-cli-service build',
      dev: 'vue-cli-service serve',
      generate: 'vue-cli-service generate'
    },
    dependencies: {
      'qrcode-generator': "^1.4.0",
      'veevalibrary': "^4.0.8",
      "vue-router": "^3.0.1",
      "vuex": "^3.0.1"
    },
    devDependencies: {
      "node-sass": "^4.9.0",
      "sass-loader": "^7.0.1"
    }
  });
  
  if (!api.hasPlugin('@vue/cli-plugin-babel')) {
    api.extendPackage({
      devDependencies: {
        "@vue/cli-plugin-babel": "^3.0.0-beta.15"
      }
    })
  }


  // copy and render all files in ./template with ejs
  api.render('./template');

  // clear src and copy clm-template
  api.onCreateComplete(() => {
    const src = api.resolve('src');
  
    fse.emptydirSync(src);
    fse.copySync(path.resolve(__dirname, 'template/src'), src);
  });

  // show info after complete
  const command = (command) => hasYarn()
    ? chalk.green(`yarn ${command}`)
    : chalk.green(`npm ${command}`);
  
  api.exitLog(`To Development: ${command('dev')}. To build: ${command('build --help')}`);
};
