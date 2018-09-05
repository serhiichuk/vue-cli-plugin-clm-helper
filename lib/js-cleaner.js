#!/usr/bin/env node

const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const { paths } = require('./config');
const { structure } = require(paths.clm.config);

module.exports = () => {
  const ignoreSlides = structure.reduce((paths, sl) => {
    if (process.env.VUE_APP_SL_PATH !== sl.path) paths.push(sl);
    return paths
  }, []);

  const ignoreRegex = new RegExp(ignoreSlides.map(sl => sl.path.split('/').pop()+'(\\.|-)').join('|'));

  fs.readdirSync(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'js')).forEach(file => {
    if (ignoreRegex.test(file)) {
      fsExtra.removeSync(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'js', file))
    }
  });
};

