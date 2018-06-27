const fse = require('fs-extra');
const path = require('path');
const {done} = require('@vue/cli-shared-utils');

const {getFullId} = require('../../lib/util/sl-id-parser');

const webpackSlideBuild = require('../../lib/webpack-slide-builder');
const assetsCleaner = require('../../lib/assets-cleaner');
const thumbMaker = require('../../lib/thumb-maker');
const archiveMaker = require('../../lib/archive-maker');

module.exports = async (api, projectOptions, args, slidesToBuild, clmName) => {

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
    await webpackSlideBuild(api, projectOptions);

    /** Clean excess from assets directory **/
    if (!args.options['no-clear-assets']) assetsCleaner();

    /** Create screens **/
    if (!args.options['no-screens']) await require('../../lib/screens-maker')(sl);

    /** Create thumbnails **/
    await thumbMaker({width: 849, height: 637, thumbName: `${outSlName}-full.jpg`});
    await thumbMaker({width: 200, height: 150, thumbName: `${outSlName}-thumb.jpg`});

    /** Create Archive **/
    await archiveMaker({archiveSubDir: outSlName});

    done(`Save: ${outSlName} for ${clmName}`)
  }
};
