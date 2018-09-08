const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { info, error } = require('@vue/cli-shared-utils');
const fsExplorerUi = require('fs-explorer-ui');
const ExcelParser = require('../lib/excel-parser');
const { paths } = require('../lib/config');

const excelExtensions = ['.xlsx'];

module.exports = async (api, options, rootOptions) => {

  const excelFiles = getExcelFiles();

  if (excelFiles.length === 1) {
    new ExcelParser(excelFiles[0])

  } else if (excelFiles.length >= 1) {
    let xlsxPath = await exploreFile(`Select your structure file ("${excelExtensions.join(', ')}")`);

    // Check if is not excel file
    while (!isXlsxFile(xlsxPath)) {
      xlsxPath = await exploreFile(chalk.red(`Wrong file! File extension must be a "${excelExtensions.join(', ')}"`));
    }

    new ExcelParser(xlsxPath);

  } else {
    error(`Files with "${excelExtensions.join(', ')}" extensions not found.`);
    info(`Put Exсel File in root-folder: "${chalk.yellow(paths.root)}", or fill in "clm.config" manually.`);
  }
};


/**
 * Get all files from "src/" with "exсelExtensions" and which name not start from "~$" (temp files)
 *
 * @returns {Array}
 */
function getExcelFiles() {
  return fs.readdirSync(paths.root).reduce((finalList, file) => {
    const isTempFile = /^~\$/.test(file);
    file = path.join(paths.root, file);

    if (isXlsxFile(file) && !isTempFile) finalList.push(file);
    return finalList;
  }, []);
}

/**
 * Check is following file have one of "exсelExtensions"
 *
 * @param filePath
 * @returns {boolean}
 */
function isXlsxFile(filePath) {
  return excelExtensions.indexOf(path.parse(filePath).ext) !== -1
}

/**
 * Run "fs-explorer-ui" to find necessary file
 *
 * @param msg
 * @returns {Promise<*>}
 */
async function exploreFile(msg) {
  return await new fsExplorerUi({
    startPath: paths.root,
    message: msg,
  });
}
