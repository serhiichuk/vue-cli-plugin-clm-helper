const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { info, error, done } = require('@vue/cli-shared-utils');
const fsExplorerUi = require('fs-explorer-ui');
const ExelParser = require('../lib/exel-parser');
const { paths } = require('../lib/config');

const exelExtensions = [ '.xlsx' ];

module.exports = async (api, options, rootOptions) => {

  const exelFiles = getExelFiles();

  if (exelFiles.length === 1) {
    new ExelParser(exelFiles[ 0 ])

  } else if (exelFiles.length >= 1) {
    let xlsxPath = await exploreFile(`Select your structure file ("${exelExtensions.join(', ')}")`);

    // Check if is not exel file
    while (!isXlsxFile(xlsxPath)) {
      xlsxPath = await exploreFile(chalk.red(`Wrong file! File extension must be a "${exelExtensions.join(', ')}"`));
    }

    new ExelParser(xlsxPath);

  } else {
    info(`Files with "${chalk.yellow(exelExtensions.join(', '))}" extensions not found.`);
    info(`Fill in "clm.config" manually.`);
  }
};


/**
 * Get all files from "src/" with "exelExtensions" and which name not start from "~$" (temp files)
 *
 * @returns {Array}
 */
function getExelFiles() {
  return fs.readdirSync(paths.root).reduce((finalList, file) => {
    const isTempFile = /^~\$/.test(file);
    file = path.join(paths.root, file);

    if (isXlsxFile(file) && !isTempFile) finalList.push(file);
    return finalList;
  }, []);
}

/**
 * Check is following file have one of "exelExtensions"
 *
 * @param filePath
 * @returns {boolean}
 */
function isXlsxFile(filePath) {
  return exelExtensions.indexOf(path.parse(filePath).ext) !== -1
}

/**
 * Run "fs-explorer-ui" to find necessary file
 *
 * @param msg
 * @returns {Promise<*>}
 */
async function exploreFile(msg) {
  return await new fsExplorerUi({
    startPath: paths.src,
    message: msg,
  });
}
