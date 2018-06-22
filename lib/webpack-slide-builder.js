const path = require('path');
const webpack = require('webpack');

module.exports = (api, projectOptions) => {
  return new Promise((resolve, reject) => {
    const config = api.resolveChainableWebpackConfig();

    config
      .plugin('copy')
      .tap(args => {
        args[0][0].to = process.env.VUE_APP_OUT_DIR_PATH;
        return args
      });

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        context: 'src/assets',
        name: `[path]/[name].[ext]`,
        publicPath: process.env.NODE_ENV === 'production' ? '../' : './'
      });

    config.module
      .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        context: 'src/assets',
        name: `[path]/[name].[ext]`
      });

    config
      .output
      .path(process.env.VUE_APP_OUT_DIR_PATH)
      .filename(`js/[name].js`)
      .chunkFilename(`js/[name].js`);

    config
      .plugin('extract-css')
      .tap(args => {
        args[0].filename = `css/[name].css`;
        args[0].chunkFilename = `css/[name].css`;
        return args
      });

    config
      .plugin('html')
      .tap(args => {
        args[0].template = api.resolve('public/index.html');
        args[0].filename = path.join(process.env.VUE_APP_OUT_DIR_PATH, process.env.VUE_APP_OUT_HTML_NAME + '.html');
        return args
      });

    config.plugins.delete('prefetch');


    webpack(config.toConfig(), (err, stats) => {

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
