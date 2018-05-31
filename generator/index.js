#!/usr/bin/env node

module.exports = (api, options, rootOptions) => {

  // modify package.json fields
  api.extendPackage({
    scripts: {
      build: 'vue-cli-service build-clm',
      'build-standard': 'vue-cli-service build',
      data: 'vue-cli-service data',
      dev: 'vue-cli-service serve',
      generate: 'vue-cli-service generate'
    },
    dependencies: {
      'qrcode-generator': "^1.4.0",
      'veevalibrary': "^4.0.8",
    },
  });

  // copy and render all files in ./template with ejs
  api.render('./template');
};
