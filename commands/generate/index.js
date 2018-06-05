#!/usr/bin/env node
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const {paths} = require('../../lib/config/index');
const parseArgs = require('../../lib/util/parse-args');
const {log, done, info, logWithSpinner, stopSpinner, error} = require('@vue/cli-shared-utils');
const {structure, languages} = require(paths.clm.config);

module.exports = (api, projectOptions, args) => {
  // Valid commands and options
  args = parseArgs(args, {
    lang: ''
  });

  if (!args.lang.test('')) {
    info(`Lang filter: ${chalk.green(args.lang)}`);

    const languagesToGenerate = languages.filter(lang => args.lang.test(lang));

    if (!languagesToGenerate.length) {
      error(`Wrong lang filter. Filter must mach ${chalk.green(languages.join('|'))}`);
      process.exit(0)
    }

    /** Create Data for each lang **/
    languagesToGenerate.forEach(lang => {
      structure.forEach(sl => createData(sl, lang))
    })
  }

  /** Create Slide and Slide Asset Dir only in one instance **/
  structure.forEach(sl => {
    createSlide(sl);
    createAssetsDirs(sl);
  })

};

function createData(sl, lang) {
  const slDataPath = path.resolve(__dirname, 'templates/slide-data.js');

  fse.copySync(slDataPath, path.join(paths.src, 'data', sl.path.replace('slides', lang) + '.js'))
}


function createSlide(sl) {
  const slDirPath = path.join(paths.src, sl.path);
  const slTemplatePath = path.resolve(__dirname, 'templates/slide-template.vue');

  fse.copySync(slTemplatePath, path.join(slDirPath, `${sl.id}.vue`))
}

function createAssetsDirs(sl) {
  fse.ensureDirSync(path.join(paths.src, 'assets', 'media', 'images', sl.id))
}
