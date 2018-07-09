const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const convertExcel = require('excel-as-json').processFile;
const { paths } = require('./config/index');
const { done, error } = require('@vue/cli-shared-utils');

module.exports = class ExelParser {
  constructor(exelPath) {
    this.exelPath = exelPath;
    this.clmConfig = {
      // clm: {
        // productId: '',
        // disableSwipeBetweenFlows: false,
      // },

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
    const { clmConfig, exelPath, parserOptions, getSlPath } = this;

    convertExcel(exelPath, null, parserOptions, (err, data) => {
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

          if (Object.keys(item.FlowName).length) slObject.flowName = item.FlowName;
          if (Object.keys(item.Swipe).length) slObject.swipe = item.Swipe;

          clmConfig.structure.push(slObject);
        }
      });

      const newConfig = JSON.stringify({ ...require(paths.clm.config), ...clmConfig }, null, '  ');

      fs.writeFileSync(paths.clm.config + '.json', newConfig);
      done(`"clm.config" was generated from "${chalk.yellow(path.relative(paths.root, exelPath))}".`);
    });
  }

  /**
   * Return generated relative path to "slide-component" for "clm.config.js"
   *
   * @param item
   * @returns {string}
   */
  getSlPath(item) {
    let result = 'slides';
    const getFlowName = (id) => /^slide-([^\.]+)/.exec(id)[ 1 ].split('_').slice(0, -1).join('_');

    if (getFlowName(item.ID)) result += `/flow-${getFlowName(item.ID)}`;
    result += `/${item.ID}`;

    return result;
  }
};
