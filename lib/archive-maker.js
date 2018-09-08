#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const archiver = require('archiver');
const { paths } = require('./config');
const { logWithSpinner, stopSpinner, error } = require('@vue/cli-shared-utils');

module.exports = (
  {
    contentPath = process.env.VUE_APP_OUT_DIR_PATH,
    archiveName = process.env.VUE_APP_OUT_HTML_NAME,
    archiveSubDir = false,
    clmName = process.env.VUE_APP_CLM,
    archivePath = path.join(paths.zip, clmName, process.env.VUE_APP_SL_LANG),
  },
) => {
  return new Promise((resolve, reject) => {

    fsExtra.ensureDirSync(archivePath);

    // create a file to stream archive data to.
    const output = fs.createWriteStream(path.join(archivePath, archiveName + '.zip'));
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      resolve();
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
        error(`Archive maker: ${err}`);
      } else {
        // throw error
        reject(err)
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      reject(err)
    });

    // pipe archive data to the file
    archive.pipe(output);
    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(contentPath, archiveSubDir);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize().then(() => {

    });
  })
};
