const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolveClientEnv = require('@vue/cli-service/lib/util/resolveClientEnv');
// const {log, done, info, logWithSpinner, stopSpinner} = require('@vue/cli-shared-utils');

module.exports = (api, projectOptions, startConfig) => {
  const outputPath = process.env.VUE_APP_OUT_DIR_PATH;

  // Define Plugin
  const defineOptions = resolveClientEnv(projectOptions.baseUrl, false /* raw */);

  // HTML plugin
  const htmlOptions = {
    templateParameters: (compilation, assets, pluginOptions) => {
      // enhance html-webpack-plugin's built in template params
      let stats;
      return Object.assign({
        // make stats lazy as it is expensive
        get webpack() {
          return stats || (stats = compilation.getStats().toJson())
        },
        compilation: compilation,
        startConfig: compilation.options,
        htmlWebpackPlugin: {
          files: assets,
          options: pluginOptions
        }
      }, resolveClientEnv(projectOptions.baseUrl, false /* raw */))
    }
  };

  htmlOptions.template = api.resolve('public/index.html');
  htmlOptions.filename = path.join(outputPath, process.env.VUE_APP_OUT_HTML_NAME + '.html');

  // Init new config for current slide
  const config = {...startConfig};

  // Change output path
  config.output.path = outputPath;

  // Replace Plugins
  config.plugins = config.plugins.map(plugin => {
    switch (plugin.constructor.name) {
      case 'HtmlWebpackPlugin':
        return new HtmlWebpackPlugin(htmlOptions);
      case 'DefinePlugin':
        return new DefinePlugin(defineOptions);
      default:
        return plugin
    }
  });

  return new Promise((resolve, reject) => {
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
