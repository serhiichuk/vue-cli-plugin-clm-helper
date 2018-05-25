module.exports = {
  baseUrl: './',
  productionSourceMap: false,

  css: {
    loaderOptions: {
    	sass: {
        // Enable all sass-files in dir 'shared' to all sass styles
        data: require('./src/style/shared')
      }
    }
  }
};
