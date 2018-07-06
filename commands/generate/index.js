const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const fsExplorerUI = require('fs-explorer-ui');
const ExelParser = require('../../lib/ExelParser');
const parseArgs = require('../../lib/util/parse-args');
const { paths } = require('../../lib/config/index');
const { info, error, done } = require('@vue/cli-shared-utils');
const { structure, languages } = require(paths.clm.config);

const exelExtensions = [ '.xlsx' ];

module.exports = async (api, projectOptions, args) => {
  // Valid commands and options
  args = parseArgs(args, {
    lang: '',
    options: {
      ne: 'no-exel',
    },
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

  /** Parse Exel file in 'src' to config **/
  if (!args.options[ 'no-exel' ]) await convertExelToJson();


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

  setTimeout(() => {
    done(`Generating complete.`)
  }, 200)
};

async function convertExelToJson() {
  const xlsxFiles = fs.readdirSync(paths.src).reduce((finalList, file) => {
    const isTempFile = /^~\$/.test(file);
    file = path.join(paths.src, file);

    if (isXlsxFile(file) && !isTempFile) finalList.push(file);
    return finalList;
  }, []);

  if (xlsxFiles.length === 1) {
    new ExelParser(xlsxFiles[ 0 ])
  } else if (xlsxFiles.length >= 1) {
    let xlsxPath = await exploreFile(`Select your structure file ("${exelExtensions.join(', ')}")`);

    while (!isXlsxFile(xlsxPath)) {
      xlsxPath = await exploreFile(chalk.red(`Wrong file! File extension must be a "${exelExtensions.join(', ')}"`));
    }

    new ExelParser(xlsxPath);

  } else {
    info(`"${exelExtensions.join(', ')}" file not found, generate default "clm.config"`);
  }
}

function isXlsxFile(filePath) {
  return exelExtensions.indexOf(path.parse(filePath).ext) !== -1
}

async function exploreFile(msg) {
  return await new fsExplorerUI({
    startPath: paths.src,
    message: msg,
  });
}


function createData(sl, lang) {
  const slDataPath = path.resolve(__dirname, 'default-templates/slide-data.js');

  fse.copySync(slDataPath, path.join(paths.src, 'data', sl.path.replace('slides', lang) + '.js'), { overwrite: false });
}


function createSlide(sl) {
  const slDirPath = path.join(paths.src, sl.path);
  const slTemplatePath = path.resolve(__dirname, 'default-templates/slide-template.vue');

  fse.copySync(slTemplatePath, slDirPath + '.vue', { overwrite: false });
}

function createAssetsDirs(sl) {
  fse.ensureDirSync(path.join(paths.src, 'assets', 'media', 'images', sl.id));
}
