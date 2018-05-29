const webpackSlideBuild = require('../../lib/webpack-slide-builder');
const path = require('path');
const {paths} = require('../../lib/config');
const {clm} = require(paths.clm.config);
const {getFullId, parseSlId} = require('../../lib/util/sl-id-perser');
const thumbMaker = require('../../lib/thumb-maker');

module.exports = async (api, projectOptions, args, slidesToBuild, clmName) => {
  const startConfig = api.resolveWebpackConfig();

  for (let sl of slidesToBuild) {
    const outSlName = getFullId(sl.id, sl.lang);

    process.env.VUE_APP_SL_ID = sl.id;
    process.env.VUE_APP_SL_PATH = sl.path;
    process.env.VUE_APP_SL_LANG = sl.lang;
    process.env.VUE_APP_OUT_DIR_PATH = api.resolve(path.join('dist', clmName, sl.lang, outSlName));
    process.env.VUE_APP_OUT_HTML_NAME = outSlName;

    /** Webpack Build **/
    await webpackSlideBuild(api, projectOptions, startConfig);

    /** Create thumbnails **/
    thumbMaker({width: 849, height: 637}, {name: `${outSlName}-full.jpg`});
    thumbMaker({width: 200, height: 150}, {name: `${outSlName}-thumb.jpg`});
  }
};
