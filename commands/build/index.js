#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const {paths} = require('../../lib/config');
const {clm, structure} = require(paths.clm.config);
const webpackSlideBuild = require('../../lib/webpack-slide-builder');

module.exports = async (api, projectOptions, args) => {
  const startConfig = api.resolveWebpackConfig();

  for (let sl of structure) {
    console.log('build', sl.path);
    process.env.VUE_APP_SL_ID = sl.id;
    process.env.VUE_APP_SL_PATH = sl.path;
    process.env.VUE_APP_OUT_DIR_NAME = sl.id;
    process.env.VUE_APP_OUT_HTML_NAME = `${clm.productID}_${sl.id}`;

    await webpackSlideBuild(api, projectOptions, startConfig)
    // config().plugins.forEach(p => {
    //   if (p.constructor.name === 'DefinePlugin') {
    //     console.log(p);
    //   }
    // });

    // return false
  }
};
