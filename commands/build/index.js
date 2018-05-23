#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
// const chalk = require('chalk');
const webpack = require('webpack');
const {paths} = require('../../lib/config');
const {structure} = require(paths.clm.config);

module.exports = async (api, projectOptions, args) => {
  // const webpackConfig = api.resolveWebpackConfig();

  for (let sl of structure) {
    const env = {
      VUE_APP_SL_ID: sl.id,
      VUE_APP_IN_PATH: path.join(paths.src, sl.path),
      VUE_APP_OUT_PATH: path.join(paths.dist, sl.id),
    };


    // webpackConfig.plugin = [...]

    // webpackConfig.plugins/

    api.chainWebpack(webpackConfig => {
      webpackConfig
        .output
          .path = env.VUE_APP_OUT_PATH;

    })
  }

  console.log(api.resolveWebpackConfig());
  // console.log(process.env)
};
