module.exports = {
  baseUrl: process.env.NODE_ENV === 'productions' ? './' : '/',
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
