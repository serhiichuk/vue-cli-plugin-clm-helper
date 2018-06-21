module.exports = {
  baseUrl: process.env.NODE_ENV === 'development' ? '/' : './',
  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        // Enable all sass-files in directory 'shared' to all sass styles
        // Do not include any files here which will have actual css output,
        // otherwise our bundle file size will grow rapidly as the output will be in every file.
        data: require('./src/style/shared')
      }
    }
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
};
