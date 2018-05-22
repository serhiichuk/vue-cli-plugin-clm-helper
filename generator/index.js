#!/usr/bin/env node

module.exports = (api, options, rootOptions) => {

  // modify package.json fields
  api.extendPackage({
    scripts: {
      generate: 'vue-cli-service generate',
      data: 'vue-cli-service data'
    }
  });

  // copy and render all files in ./template with ejs
  // api.render('./template');
};
