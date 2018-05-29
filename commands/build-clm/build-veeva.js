const webpackSlideBuild = require('../../lib/webpack-slide-builder');

module.exports = async(api, projectOptions, startConfig) => {

  console.log('build', sl.path);
  process.env.VUE_APP_SL_ID = sl.id;
  process.env.VUE_APP_SL_PATH = sl.path;
  process.env.VUE_APP_OUT_DIR_NAME = sl.id;
  process.env.VUE_APP_OUT_HTML_NAME = `${clm.productID}_${sl.id}`;


  await webpackSlideBuild(api, projectOptions, startConfig)


};
