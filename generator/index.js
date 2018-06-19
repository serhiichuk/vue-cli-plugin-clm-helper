const fs = require('fs');
const fse = require('fs-extra');
const chalk = require('chalk');
const {hasYarn} = require('@vue/cli-shared-utils');

module.exports = (api, options, rootOptions) => {

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

  // if (!api.hasPlugin('@vue/cli-plugin-babel')) {
  //   api.extendPackage({
  //     devDependencies: {
  //       "@vue/cli-plugin-babel": "^3.0.0-rc.3"
  //     }
  //   })
  // }


  // copy and render all files in ./template with ejs
  api.render('./template');

  // clear src and copy clm-template
  api.onCreateComplete(() => {
    const deleted = [];
    const toDelete = [
      'public/favicon.ico',

      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/views',
      'src/router.js',
      'src/store.js',
    ];


    toDelete.forEach(relativePath => {
      const fullPath = api.resolve(relativePath);

      if (fs.existsSync(fullPath)) {
        fse.removeSync(fullPath);
        deleted.push('\t' + relativePath);
      }
    });

    if (!!deleted.length) {
      console.log(`\n\n    The following files have been deleted:\n ${chalk.red(deleted.join('\n'))}\n`);
    }
  });

  // show info after complete
  const command = (command) => hasYarn()
    ? chalk.green(`yarn ${command}`)
    : chalk.green(`npm ${command}`);

  api.exitLog(`To Development: ${command('dev')}. To build: ${command('build --help')}`);
};
