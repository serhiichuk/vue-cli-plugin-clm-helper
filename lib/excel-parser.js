const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const convertExcel = require('excel-as-json').processFile;
const { paths } = require('./config/index');
const { done, error } = require('@vue/cli-shared-utils');

module.exports = class ExcelParser {
  constructor(excelPath) {
    this.excelPath = excelPath;
    this.clmConfig = {
      structure: [],
    };

    this.parserOptions = {
      omitEmptyFields: true,
      convertTextToNumber: true,
      sheet: 1,
    };

    this.run();
  }

  run() {
    const { clmConfig, excelPath, parserOptions, getSlPath } = this;

    convertExcel(excelPath, null, parserOptions, (err, data) => {
      if (err) {
        error(err);
        process.exit(1);
      }

      data.forEach(item => {
        if (item.ID) {
          const slObject = {
            id: item.ID,
            path: getSlPath(item),
            name: item.SlideName,
          };

          if (item.FlowName && Object.keys(item.FlowName).length) slObject.flowName = item.FlowName;
          if (item.Swipe && Object.keys(item.Swipe).length) slObject.swipe = item.Swipe;

          clmConfig.structure.push(slObject);
        }
      });

      const newConfig = JSON.stringify({ ...require(paths.clm.config), ...clmConfig }, null, '  ');

      fs.writeFileSync(paths.clm.config + '.json', newConfig);
      done(`"clm.config" was generated from "${chalk.yellow(path.relative(paths.root, excelPath))}".`);
    });
  }

  /**
   * Return generated relative path to "slide-component" for "clm.config.js"
   *
   * @param item
   * @returns {string}
   */
  getSlPath(item) {
    const getFlowName = id => /^slide-([^\.]+)/.exec(id)[1]
      .split('_')
      .slice(0, -1)
      .join('_');

    return getFlowName(item.ID)
      ? `flow-${getFlowName(item.ID)}/${item.ID}`
      : `${item.ID}`;
  }
};
