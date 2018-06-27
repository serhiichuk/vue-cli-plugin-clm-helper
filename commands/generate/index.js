const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const {paths} = require('../../lib/config/index');
const parseArgs = require('../../lib/util/parse-args');
const {info, error} = require('@vue/cli-shared-utils');
const {structure, languages} = require(paths.clm.config);

module.exports = (api, projectOptions, args) => {
  // Valid commands and options
  args = parseArgs(args, {
    lang: ''
  });

  let languagesToGenerate = languages;

  if (!args.lang.test('')) {
    info(`Lang filter: ${chalk.green(args.lang)}`);

    languagesToGenerate = languages.filter(lang => args.lang.test(lang));

    if (!languagesToGenerate.length) {
      error(`Wrong lang filter. Filter must mach ${chalk.green(languages.join('|'))}`);
      process.exit(0)
    }
  }

  /** Create Data for each lang **/
  languagesToGenerate.forEach(lang => {
    structure.forEach(sl => createData(sl, lang))
  });

  /** Create Slide and Slide Asset Dir only in one instance **/
  structure.forEach(sl => {
    createSlide(sl);
    createAssetsDirs(sl);
  })

};

function createData(sl, lang) {
  const slDataPath = path.resolve(__dirname, 'default-templates/slide-data.js');

  fse.copySync(slDataPath, path.join(paths.src, 'data', sl.path.replace('slides', lang) + '.js'), {overwrite: false})
}


function createSlide(sl) {
  const slDirPath = path.join(paths.src, sl.path);
  const slTemplatePath = path.resolve(__dirname, 'default-templates/slide-template.vue');

  fse.copySync(slTemplatePath, slDirPath + '.vue', {overwrite: false})
}

function createAssetsDirs(sl) {
  fse.ensureDirSync(path.join(paths.src, 'assets', 'media', 'images', sl.id))
}
