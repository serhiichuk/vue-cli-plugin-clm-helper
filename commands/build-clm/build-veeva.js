const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const { done, error } = require('@vue/cli-shared-utils');
const { getFullId } = require('../../lib/util/sl-id-parser');
const { paths } = require('../../lib/config');
const { clm, structure, languages } = require(paths.clm.config);

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
    process.env.VUE_APP_OUT_HTML_NAME = outSlName;

    /** Clear slide dir **/
    fse.emptyDirSync(process.env.VUE_APP_OUT_DIR_PATH);

    /** Webpack Build **/
    await webpackSlideBuild(api, projectOptions);

    /** Create screens **/
    if (!args.options['no-screens']) await require('../../lib/screens-maker')(sl);

    /** Create thumbnails **/
    await thumbMaker({ width: 849, height: 637, thumbName: `${outSlName}-full.jpg` });
    await thumbMaker({ width: 200, height: 150, thumbName: `${outSlName}-thumb.jpg` });

    /** Clean excess from assets directory **/
    if (!args.options['no-clear-assets']) assetsCleaner();

    /** Clean excess from js directory **/
    if (!args.options['no-clear-js']) jsCleaner();

    /** Create Archive **/
    await archiveMaker({ archiveSubDir: outSlName });
  }

  generateVeevaCsv(clmName);
};

function generateVeevaCsv(clmName) {
  const csv = {
    country: (clm.csv && clm.csv.country) || "Ukraine",
    product: (clm.csv && clm.csv.product) || "INCH",
  };

  const shema = [
    'name__v',
    'Presentation Link',
    'Type',
    'slide.filename',
    'external_id__v',
    'lifecycle__v',
    'pres.product__v.name__v',
    'slide.product__v.name__v',
    'pres.country__v.name__v',
    'slide.country__v.name__v',
    'pres.clm_content__v',
    'slide.clm_content__v',
    'slide.crm_media_type__v',
    'pres.crm_presentation_id__v',
    'slide.crm_disable_actions__v',
  ];

  const addRow = ({ type, lang, sl, productName }) => {
    const isSlideType = type === 'slide';
    const id = isSlideType ? getFullId(sl.id, lang) : '';

    return [
      isSlideType ? id : productName, // name__v
      isSlideType ? productName : '', // Presentation Link
      isSlideType ? 'Slide' : 'Presentation', // Type
      isSlideType ? id + '.zip' : '', // slide.filename
      isSlideType ? id : productName, // external_id__v
      isSlideType ? 'CRM Content Lifecycle' : 'Binder Lifecycle', // lifecycle__v
      isSlideType ? '' : csv.product, // pres.product__v.name__v
      isSlideType ? csv.product : '', // slide.product__v.name__v
      isSlideType ? '' : csv.country, // pres.country__v.name__v
      isSlideType ? csv.country : '', // slide.country__v.name__v
      isSlideType ? '' : 'YES', // pres.clm_content__v
      isSlideType ? 'YES' : '', // slide.clm_content__v
      isSlideType ? 'HTML' : '', // slide.crm_media_type__v
      isSlideType ? '' : '', // pres.crm_presentation_id__v
      isSlideType ? '' : '', // slide.crm_disable_actions__v
    ].join(',') + '\n'
  };

  // Generate CSV for each lang
  fs.readdirSync(path.join(paths.dist, clmName)).forEach(lang => {
    let data = '';
    const productName = `${clm.productName}_${lang.toUpperCase()}`;

    // Row #1 (Legend)
    data += shema.join(',') + '\n';

    // Row #2 (Presentation)
    data += addRow({ lang, productName });

    // Row #3 (Slides)
    structure.forEach(sl => {
      data += addRow({ type: 'slide', lang, sl, productName })
    });

    // Save as file if not exist
    const csvPath = path.join(paths.dist, clmName, lang, productName + '.csv');

    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, data, { flag: 'a+' });
      done(`CSV Created: "${chalk.green(path.relative(paths.root, csvPath))}"`);
    }
  });
}
