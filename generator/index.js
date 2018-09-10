const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const { hasYarn } = require('@vue/cli-shared-utils');
const {paths} = require('../lib/config');

module.exports = (api, options, rootOptions) => {
  // modify package.json fields
  api.extendPackage({
    scripts: {
      build: 'vue-cli-service build-clm',
      'build-standard': 'vue-cli-service build',
      // Increase JavaScript heap of memory
      dev: 'node --max_old_space_size=4096 node_modules/@vue/cli-service/bin/vue-cli-service serve',
      excel: 'vue-cli-service excel-to-config',
      generate: 'vue-cli-service generate',
    },
    dependencies: {
      'veevalibrary': '^4.0.8',
      'vue2-touch-events': '^1.0.0',
      'vue-router': '^3.0.1',
      'vuex': '^3.0.1',
    },
    devDependencies: {
      '@vue/cli-plugin-babel': '^3.0.1',
      'node-sass': '^4.9.0',
      'sass-loader': '^7.0.1',
      'vue-svg-loader': '^0.9.0',
      'qrcode-generator': '^1.4.0',
    },
  });

  // add frequently used packages from prompt
  if (options['frequently-packages']) {

    if (options['frequently-packages-answers'].includes('gsap')) {
      api.extendPackage({
        dependencies: {
          'gsap': '^2.0.2',
        },
      })
    }

    if (options['frequently-packages-answers'].includes('json-to-html')) {
      api.extendPackage({
        dependencies: {
          'vue-json-to-html': '^0.1.12',
        },
      });

      api.injectImports(api.entryFile, `import JsonToVue from 'vue-json-to-html'`)
    }

    if (options['frequently-packages-answers'].includes('mt-plugin')) {
      api.extendPackage({
        dependencies: {
          'vue-clm-helper-mi-touch': '^0.1.15',
        },
      });

      api.injectImports(api.entryFile, `import MtPlugin from 'vue-clm-helper-mi-touch'`)
    }
  } else {
    // still using options['frequently-packages-answers'].includes() in templates
    options['frequently-packages-answers'] = [];
  }

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

    // delete default router and store imports from "main.js"
    const mainPath = api.resolve(api.entryFile);
    const mainData = fs.readFileSync(mainPath, 'utf8')
      .replace("import store from './store'", '')
      .replace("import router from './router'", '');

    fs.writeFileSync(mainPath, mainData);

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
