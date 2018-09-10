const fse = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const chalk = require('chalk');
const parseArgs = require('../../lib/util/parse-args');
const { paths } = require('../../lib/config/index');
const { info, error, done } = require('@vue/cli-shared-utils');
const { structure, languages } = require(paths.clm.config);

module.exports = (api, projectOptions, args) => {
  // Valid commands and options
  args = parseArgs(args, {
    lang: '',
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
  info(`Text data files was created.`);

  /** Create Slide and Slide Asset Dir only in one instance **/
  structure.forEach(sl => {
    createSlide(sl);
    createAssetsDirs(sl);
  });
  info(`Assets folders for each slide was created.`);
  info(`Slide-component files was created.`);

  done(`Generating complete.`)
};


function createData(sl, lang) {
  const slDataPath = path.resolve(__dirname, 'default-templates/slide-data.js');

  fse.copySync(slDataPath, path.join(paths.src, 'data', lang, sl.path + '.js'), { overwrite: false });
}


function createSlide(sl) {
  const slTemplatePath = path.resolve(__dirname, 'default-templates/slide-template.vue');
  const slCompiledPath = path.join(paths.src, 'slides', sl.path + '.vue');
  const data = {
    slide: sl,
    src: path.relative(path.resolve(slCompiledPath, '../'), paths.src).replace(/\\/g, '/'),
  };

  ejs.renderFile(slTemplatePath, data, (err, compiled) => {
    if (err) throw new Error(err);
    else fse.outputFileSync(slCompiledPath, compiled);
  })
}

function createAssetsDirs(sl) {
  fse.ensureDirSync(path.join(paths.src, 'assets', 'media', 'images', sl.path));
}
