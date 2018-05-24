module.exports = {
  baseUrl: './',
  productionSourceMap: false,

  css: {
    loaderOptions: {
    	sass: {
        // Share global sass-file to all sass styles
        data: require('fs').readFileSync('./src/style/shared-globals.scss', 'utf-8')
      }
    }
  }
};
