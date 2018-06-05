module.exports = {
  baseUrl: process.env.NODE_ENV === 'development' ? '/' : './',
  productionSourceMap: false,

  css: {
    loaderOptions: {
    	sass: {
        // Enable all sass-files in dir 'shared' to all sass styles
        data: require('./src/style/shared')
      }
    }
  },

  // Configure webpack
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
};
