const fse = require('fs-extra');
const path = require('path');
const { paths } = require('../../lib/config');
const { structure } = require(paths.clm.config);
const { getFullId } = require('../../lib/util/sl-id-parser');
const webpackSlideBuild = require('../../lib/webpack-slide-builder');
const assetsCleaner = require('../../lib/assets-cleaner');
const jsCleaner = require('../../lib/js-cleaner');
const thumbMaker = require('../../lib/thumb-maker');
const archiveMaker = require('../../lib/archive-maker');


module.exports = async (api, projectOptions, args, slidesToBuild, clmName) => {
  for (let sl of slidesToBuild) {
    const outSlName = getFullId(sl.id, sl.lang);

    process.env.VUE_APP_CLM = clmName;
    process.env.VUE_APP_SL_ID = sl.id;
    process.env.VUE_APP_SL_PATH = sl.path;
    process.env.VUE_APP_SL_LANG = sl.lang;
    process.env.VUE_APP_OUT_DIR_PATH = path.join(paths.dist, clmName, sl.lang, outSlName);
    process.env.VUE_APP_OUT_DIR_NAME = outSlName;
    process.env.VUE_APP_OUT_HTML_NAME = 'index';

    /** Clear slide dir **/
    fse.emptyDirSync(process.env.VUE_APP_OUT_DIR_PATH);

    /** Webpack Build **/
    await webpackSlideBuild(api, projectOptions);

    /** Create screens **/
    if (!args.options['no-screens']) await require('../../lib/screens-maker')(sl);

    /** Create thumbnails **/
    await thumbMaker({
      width: 200,
      height: 150,
      thumbName: `200x150.jpg`,
      thumbPath: path.join(process.env.VUE_APP_OUT_DIR_PATH, 'media', 'images', 'thumbnails'),
    });

    /** Clean excess from assets directory **/
    if (!args.options['no-clear-assets']) assetsCleaner();

    /** Clean excess from js directory **/
    if (!args.options['no-clear-js']) jsCleaner();

    /** MI Touch special **/
    createSpecialMiTouchElements();

    /** Create Archive **/
    await archiveMaker({ archiveName: process.env.VUE_APP_OUT_DIR_NAME });
  }
};

function createSpecialMiTouchElements() {
  fse.outputFileSync(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'export', 'export.pdf'));
  fse.outputFileSync(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'parameters', 'parameters.xml'), getParametersFileContent());
}

function getParametersFileContent(slide) {
  let callDialog = undefined;

  structure.forEach(sl => {
    if (sl.id === process.env.VUE_APP_SL_ID) callDialog = sl.callDialog
  });

  return `<Sequence Id="${process.env.VUE_APP_OUT_DIR_NAME}" xmlns="urn:param-schema">
  ${(!!callDialog && callDialog.length) ?
    `<CallDialog>
      <Questions>
${callDialog.map((question, i) => {
      const id = typeof question === 'object' ? question.id : `Q${i + 1}`;
      const text = typeof question === 'object' ? question.question : question;
      return `        <Question id="${id}" text="${text}" type="TEXT"/>`
    }).join('\n')}
    </Questions>
  </CallDialog>`
    : ''}
</Sequence>`;
}
