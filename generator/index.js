#!/usr/bin/env node

module.exports = (api, options, rootOptions) => {

  // modify package.json fields
  api.extendPackage({
    scripts: {
      generate: 'vue-cli-service generate',
      data: 'vue-cli-service data',
      dev: 'vue-cli-service serve'
    },
    vue: {
      baseUrl: './',
      css: {
        loaderOptions: {
          sass: {
            // Share global sass-file to all sass styles
            data: fs.readFileSync('./src/style/shared-globals.scss', 'utf-8')
          }
        }
      },
      productionSourceMap: false
    }
  });

  // copy and render all files in ./template with ejs
  api.render('./template');
};
