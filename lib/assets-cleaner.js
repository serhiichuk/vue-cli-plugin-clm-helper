#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const deleteEmpty = require('delete-empty');
const { paths } = require('./config');
const { structure } = require(paths.clm.config);
const IgnoredSlides = require('./sharedUtils/IgnoredSlides');

module.exports = () => {
  const ignored = new IgnoredSlides(new RegExp(process.env.VUE_APP_SL_PATH + '$'), structure);
  const slMediaPath = path.join(process.env.VUE_APP_OUT_DIR_PATH, 'media');
  const mediaFiles = getAllFiles(slMediaPath);

  mediaFiles.forEach(file => {
    const relativePath = path.relative(slMediaPath, file).replace(/\\/g, '/');
    // add delimiter to end of path, for prevent wrong match
    if (ignored.paths.some(_path => relativePath.match(new RegExp(_path + '/')))) {
      rimraf.sync(file);
    }
  });

  deleteEmpty.sync(slMediaPath);
};


/**
 * Find all files inside a dir, recursively.
 *
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
function getAllFiles(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).reduce((files, file) => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, [])
    : []
}
