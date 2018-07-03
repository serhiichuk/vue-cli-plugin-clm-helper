#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const {paths} = require('./config');
const {structure} = require(paths.clm.config);

module.exports = () => {
  const mediaDirs = getDirectories(path.join(process.env.VUE_APP_OUT_DIR_PATH, 'media'));

  // Loop around all dirs in "media"
  mediaDirs.forEach(mediaDir => {
    const mediaDirContentDirs = getDirectories(mediaDir.path);

    // Loop around all dirs in "media/[dir]"
    mediaDirContentDirs.forEach(mediaDirContentDir => {

      const isDirFromStructure = structure.some(sl => sl.id === mediaDirContentDir.name);
      const isMediaDirForCurrentSlide = mediaDirContentDir.name === process.env.VUE_APP_SL_ID;

      // Delete dir if dir name contained in structure
      // and this is not the same name as the current slide
      if (isDirFromStructure && !isMediaDirForCurrentSlide) {
        rimraf.sync(mediaDirContentDir.path);
      }
    })
  });
};

function getDirectories(inPath) {
  if (!fs.existsSync(inPath)) {
    return [];
  } else {
    return fs.readdirSync(inPath).reduce((dirs, dir) => {
      const dirPath = path.join(inPath, dir);

      if (fs.statSync(dirPath).isDirectory()) dirs.push({
        name: dir,
        path: dirPath
      });

      return dirs;
    }, [])
  }
}
