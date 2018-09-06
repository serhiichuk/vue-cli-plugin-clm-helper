#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { paths } = require('./config');
const { structure } = require(paths.clm.config);
const IgnoredSlides = require('./sharedUtils/IgnoredSlides');

module.exports = () => {
  const mediaFiles = getAllFiles(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'media'));
  const ignored = new IgnoredSlides(new RegExp(process.env.VUE_APP_SL_PATH + '$'), structure);

  mediaFiles.forEach(file => {
    const relativePath = path.relative(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'media'), file).replace(/\\/g, '/');

    if (ignored.paths.some(_path => relativePath.match(new RegExp(_path)))) {
      // rimraf.sync(file);
      console.log(file);
    }
  });


  // Loop around all dirs in "media"
  // mediaDirs.forEach(mediaDir => {
  //   const mediaDirContentDirs = getDirectories(mediaDir.path);
  //
  //
  //   // Loop around all dirs in "media/[dir]"
  //   mediaDirContentDirs.forEach(mediaDirContentDir => {
  //     console.log(mediaDirContentDir, ignored.regexp.test(mediaDirContentDir));
  //
  //     const isDirFromStructure = structure.some(sl => sl.id === mediaDirContentDir.name);
  //     const isMediaDirForCurrentSlide = mediaDirContentDir.name === process.env.VUE_APP_SL_ID;
  //
  //     // Delete dir if dir name contained in structure
  //     // and this is not the same name as the current slide
  //     // if (isDirFromStructure && !isMediaDirForCurrentSlide) {
  //     //   rimraf.sync(mediaDirContentDir.path);
  //     // }
  //   })
  // });

  process.exit(0);
};

function getDirectories(inPath) {
  if (!fs.existsSync(inPath)) {
    return [];
  } else {
    return fs.readdirSync(inPath).reduce((dirs, dir) => {
      const dirPath = path.join(inPath, dir);

      if (fs.statSync(dirPath).isDirectory()) dirs.push({
        name: dir,
        path: dirPath,
      });

      return dirs;
    }, [])
  }
}

/**
 * Find all files inside a dir, recursively.
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
function getAllFiles(dir) {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, [])
}
