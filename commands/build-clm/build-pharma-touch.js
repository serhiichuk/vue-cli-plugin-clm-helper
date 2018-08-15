const fs = require('fs');
const path = require('path');
const cyrillicToTransit = require('cyrillic-to-translit-js');

const { paths } = require('../../lib/config');
const { languages, clm, structure } = require(paths.clm.config);
const { getFullId } = require('../../lib/util/sl-id-parser');
const webpackSlideBuild = require('../../lib/webpack-slide-builder');
const thumbMaker = require('../../lib/thumb-maker');
const archiveMaker = require('../../lib/archive-maker');

module.exports = async (api, projectOptions, args, slidesToBuild, clmName) => {

  for (let sl of slidesToBuild) {
    const outSlName = getFullId(sl.id, sl.lang);

    process.env.VUE_APP_CLM = clmName;
    process.env.VUE_APP_SL_ID = sl.id;
    process.env.VUE_APP_SL_PATH = sl.path;
    process.env.VUE_APP_SL_LANG = sl.lang;
    process.env.VUE_APP_OUT_DIR_PATH = path.join(paths.dist, clmName, sl.lang);
    process.env.VUE_APP_OUT_HTML_NAME = outSlName;

    /** Webpack Build **/
    await webpackSlideBuild(api, projectOptions);

    /** Create screens **/
    if (!args.options['no-screens']) await require('../../lib/screens-maker')(sl);

    /** Create thumbnails **/
    await thumbMaker({ width: 300, height: 225 });
  }


  for (let lang of languages.filter(lang => args.lang.test(lang))) {
    const outBuildDir = path.join(paths.dist, clmName, lang);

    /** Create structure.json **/
    createStructureForPT(outBuildDir, lang);

    /** Create Archive **/
    await archiveMaker({
      contentPath: outBuildDir,
      archiveName: `${clm.productId}_${lang.toUpperCase()}`,
      archivePath: path.join(paths.zip, clmName),
    });
  }
};

/**
 * Create special Json for pharma-touch
 *
 * @param outBuildDir
 * @param lang
 */
function createStructureForPT(outBuildDir, lang) {
  const json = {};

  json.slides = structure.map((sl, index) => ({
    mapname: clm.productId,
    name: sl.name ? getTransitName(sl.name, lang) : sl.id,
    filename: getFullId(sl.id, lang) + '.html',
    preview: getFullId(sl.id, lang) + '.jpg',
    ishidden: 0,
    position: index + 1,
  }));

  fs.writeFileSync(path.join(outBuildDir, 'slides.json'), JSON.stringify(json, null, '  '));
}

/**
 * Return translit name
 *
 * @param name
 * @param lang
 * @returns {string}
 */
function getTransitName(name, lang) {
  name = typeof name === 'string' ? name : name[lang];

  switch (lang) {
    case 'ua':
      return cyrillicToTransit({ preset: 'uk' }).transform(name);

    case 'ru':
      return cyrillicToTransit({ preset: 'ru' }).transform(name);
    default:
      return name
  }
}
