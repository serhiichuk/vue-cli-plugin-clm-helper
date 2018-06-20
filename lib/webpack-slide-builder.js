const path = require('path');
const webpack = require('webpack');

module.exports = (api, projectOptions) => {
  api.chainWebpack(webpackConfig => {

    webpackConfig
      .output
      .path(process.env.VUE_APP_OUT_DIR_PATH)
      .filename('js/[name].[chunkhash:8].js')
      .chunkFilename('js/[name].[chunkhash:8].js');

    webpackConfig
      .plugin('extract-css')
      .tap(args => {
        args[0].filename = `css/[name].[contenthash:8].css`;
        args[0].chunkFilename = `css/[name].[contenthash:8].css`;
        return args
      });

    webpackConfig
      .plugin('html')
      .tap(args => {
        args[0].template = api.resolve('public/index.html');
        args[0].filename = path.join(process.env.VUE_APP_OUT_DIR_PATH, process.env.VUE_APP_OUT_HTML_NAME + '.html');
        return args
      });

    webpackConfig.plugins.delete('prefetch')
  });

  return new Promise((resolve, reject) => {
    const config = api.resolveWebpackConfig();

    webpack(config, (err, stats) => {

      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        return reject(`Build failed with errors.`)
      }

      resolve()
    })
  })
};
