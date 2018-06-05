const path = require('path');
const fse = require('fs-extra');
const thumbMaker = require('../../lib/thumb-maker');
const archiveMaker = require('../../lib/archive-maker');
const webpackSlideBuild = require('../../lib/webpack-slide-builder');
const {getFullId, parseSlId} = require('../../lib/util/sl-id-parser');

module.exports = async (api, projectOptions, args, slidesToBuild, clmName) => {
  const startConfig = api.resolveWebpackConfig();

  for (let sl of slidesToBuild) {
    const outSlName = getFullId(sl.id, sl.lang);

    process.env.VUE_APP_CLM = clmName;
    process.env.VUE_APP_SL_ID = sl.id;
    process.env.VUE_APP_SL_PATH = sl.path;
    process.env.VUE_APP_SL_LANG = sl.lang;
    process.env.VUE_APP_OUT_DIR_PATH = api.resolve(path.join('dist', clmName, sl.lang, outSlName));
    process.env.VUE_APP_OUT_HTML_NAME = outSlName;

    /** Clear slide dir **/
    fse.emptyDirSync(process.env.VUE_APP_OUT_DIR_PATH);

    /** Webpack Build **/
    await webpackSlideBuild(api, projectOptions, startConfig);

    /** Create thumbnails **/
    await thumbMaker({width: 849, height: 637, thumbName: `${outSlName}-full.jpg`});
    await thumbMaker({width: 200, height: 150, thumbName: `${outSlName}-thumb.jpg`});

    /** Create Archive **/
    await archiveMaker({archiveSubDir: outSlName});
  }
};
