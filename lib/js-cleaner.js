#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { paths } = require('./config');
const { structure } = require(paths.clm.config);
const IgnoredSlides = require('./sharedUtils/IgnoredSlides');

module.exports = () => {
  const ignored = new IgnoredSlides(new RegExp(process.env.VUE_APP_SL_PATH + '$'), structure)
    .paths
    .map(_path => _path.replace(/\//g, '-') + '-'); // add delimiter to end of path? for prevent wrong match
  ignored.push('dev-'); // ignore dev-components

  const slJsPath = path.join(process.env.VUE_APP_OUT_DIR_PATH, 'js');
  fs.readdirSync(slJsPath).forEach(file => {
    if (ignored.some(_path => file.match(new RegExp(_path)))) {
      rimraf.sync(path.join(slJsPath, file));
    }
  });
};

