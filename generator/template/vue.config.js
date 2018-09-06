// const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

const ignoreSlides = require('./src/clm.config').structure.reduce((paths, sl) => {
  const pathRegex = new RegExp(isProd ? process.env.VUE_APP_SL_PATH : process.env.VUE_APP_RESTRICTED_WORKSPACE_REGEX);
  if (!pathRegex.test(sl.path)) paths.push(sl);
  return paths
}, []);

const ignoreRegex = new RegExp(ignoreSlides.map(sl => sl.path.split('/').pop()).join('|'));
// const ignorePatterns = ignoreSlides.reduce((patterns, sl) => {
//   patterns.push(path.join(__dirname, 'src', sl.path));
//   patterns.push(path.join(__dirname, 'src', 'assets', 'images', sl.id));
//   patterns.push(path.join(__dirname, 'src', sl.path.replace('slides/', 'data/**/')+ '.js'));
//
//   return patterns
// }, []);

module.exports = {
  baseUrl: process.env.NODE_ENV === 'development' ? '/' : './',
  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        // Set "$width" and "$height" from "clm.config" and include global variables and mixins to all styles.
        data: `
          $width: ${require('./src/clm.config').device.resolution.width}px;
          $height: ${require('./src/clm.config').device.resolution.height}px;
          @import "@/style/_variables.scss";
          @import "@/style/_mixins.scss";`,
      },
    },
  },

  chainWebpack: config => {
    // Replace SVG loader
    const svgRule = config.module.rule('svg');
    svgRule
      .uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    // Set Ignore options
    // For using Restricted Workspace in development - add slide-path regex in ".env.development"
    // config
    //   .plugin('ignore')
    //   .use(webpack.IgnorePlugin, [ignoreRegex, /slides|data|assets/]);

    // config
    //   .plugin('copy')
    //   .tap(args => {
    //     args[0][0].ignore = [...args[0][0].ignore, ...ignorePatterns];
    //     return args
    //   });

    // config
    //   .devServer
    //   .watchOptions({ ignored: ignoreRegex });
    //
    // config.module
    //   .noParse(/^(vue|vue-router|vuex|vuex-router-sync|jquery|jquery-ui|jquery-ui-bundle|veevalibrary|gsap|vue-clm-helper-mi-touch|vue2-touch-events)$/)
  },
};
