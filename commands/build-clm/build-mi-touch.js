const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {done} = require('@vue/cli-shared-utils');

const {getFullId, parseSlId} = require('../../lib/util/sl-id-parser');
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
    process.env.VUE_APP_OUT_DIR_NAME = outSlName;
    process.env.VUE_APP_OUT_HTML_NAME = 'index';

    /** Clear slide dir **/
    fse.emptyDirSync(process.env.VUE_APP_OUT_DIR_PATH);

    /** Webpack Build **/
    await webpackSlideBuild(api, projectOptions);

    /** Clean excess from assets directory **/
    if (!args.options['no-clear-assets']) assetsCleaner();

    /** Create screens **/
    if (!args.options['no-screens']) await require('../../lib/screens-maker')(sl);

    /** Create thumbnails **/
    await thumbMaker({
      width: 200,
      height: 150,
      thumbName: `200x150.jpg`,
      thumbPath: path.join(process.env.VUE_APP_OUT_DIR_PATH, 'media', 'images', 'thumbnails')
    });

    /** MI Touch special **/
    createSpecialMiTouchElements();

    /** Create Archive **/
    await archiveMaker({
      archiveName: process.env.VUE_APP_OUT_DIR_NAME
    });

    done(`Save: ${outSlName} for ${clmName}`)
  }
};

function createSpecialMiTouchElements() {
  const slide = {
    path: process.env.VUE_APP_OUT_DIR_PATH,
    name: process.env.VUE_APP_OUT_DIR_NAME
  };

  fse.outputFileSync(path.join(slide.path, 'export', 'export.pdf'));

  const paramsContent = `<Sequence Id="${slide.name}" xmlns="urn:param-schema"></Sequence>`;
  fse.outputFileSync(path.join(slide.path, 'parameters', 'parameters.xml'), paramsContent);
}
