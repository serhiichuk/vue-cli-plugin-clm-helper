const path = require('path');
const webpack = require('webpack');
const { logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils');
const {paths} = require('./config');
const {structure} = require(paths.clm.config);

module.exports = (api, projectOptions) => {
  return new Promise((resolve, reject) => {
    // console.log('\x1Bc');
    logWithSpinner(`Webpack building ${process.env.VUE_APP_SL_ID}, for ${process.env.VUE_APP_CLM}...`);

    const config = api.resolveChainableWebpackConfig();

    const ignoreSlides = structure.reduce((paths, sl) => {
      if (process.env.VUE_APP_SL_PATH !== sl.path) paths.push(sl);
      return paths
    }, []);

    const ignoreRegex = new RegExp(ignoreSlides.map(sl => sl.path.split('/').pop()+'(\\.|-)').join('|'));

    const ignorePatterns = ignoreSlides.reduce((patterns, sl) => {
      // patterns.push(path.join(paths.src, sl.id));
      patterns.push(path.join(paths.src, 'assets', '**', sl.id));
      patterns.push(path.join(paths.src, sl.path.replace('slides/', 'data/**/')+ '/*.js'));
      return patterns
    }, []);

    config
      .plugin('ignore')
      .use(webpack.IgnorePlugin, [ignoreRegex, /slides|data|assets/]);

    config
      .plugin('copy')
      .tap(args => {
        args[0][0].to = process.env.VUE_APP_OUT_DIR_PATH;
        args[0][0].ignore = [...args[0][0].ignore, ...ignorePatterns];
        return args
      });

    config.performance
      .hints(false);

    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        name: `fonts/[name].[hash:8].[ext]`,
        publicPath: '../',
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
      });

    config.module
      .rule('media')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        context: 'src/assets',
        name: `[path]/[name].[ext]`,
      });

    config
      .output
      .path(process.env.VUE_APP_OUT_DIR_PATH)
      .filename(`js/[name].[chunkhash:8].js`)
      .chunkFilename(`js/[name].[chunkhash:8].js`);

    config
      .plugin('extract-css')
      .tap(args => {
        args[0].filename = `css/[name].[contenthash:8].css`;
        args[0].chunkFilename = `css/[name].[contenthash:8].css`;
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
      stopSpinner(true);
      resolve()
    })
  })
};
