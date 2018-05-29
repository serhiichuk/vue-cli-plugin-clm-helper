const webpackSlideBuild = require('../../lib/webpack-slide-builder');
const {paths} = require('../../lib/config');
const {clm} = require(paths.clm.config);
const {getFullId, parseSlId} = require('../../lib/util/sl-id-perser');

module.exports = async(api, projectOptions, structure) => {
  const startConfig = api.resolveWebpackConfig();

  for (let sl of structure) {

    process.env.VUE_APP_SL_ID = sl.id;
    process.env.VUE_APP_SL_PATH = sl.path;
    process.env.VUE_APP_OUT_DIR_NAME = sl.id;
    process.env.VUE_APP_OUT_HTML_NAME = `${clm.productId}_${sl.id}`;


    [
      "TEST_C2_18_UA_slide-1_1",
      "MAG_DOC_C1_18_RU_slide-0_1",
      "Tanakan_CLM_C1_2018_Pharma_UA_slide-info"
    ].forEach(id => {
      // console.log(id);
      // console.log(parseSlId(id));
      // console.log()
    })
    // await webpackSlideBuild(api, projectOptions, startConfig)
  }



};
