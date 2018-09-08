const path = require('path');
const fsExtra = require('fs-extra');
const sharp = require('sharp');
const { paths } = require('./config');
const { logWithSpinner, error } = require('@vue/cli-shared-utils');

module.exports = (
  {
    width,
    height,
    thumbPath = process.env.VUE_APP_OUT_DIR_PATH,
    thumbName = process.env.VUE_APP_OUT_HTML_NAME + '.png',
  },
) => {
  return new Promise((resolve, reject) => {
    const screenPath = path.join(paths.screens, process.env.VUE_APP_CLM, process.env.VUE_APP_SL_LANG, `${process.env.VUE_APP_SL_ID}.png`);
    const screen = sharp(screenPath).ignoreAspectRatio();

    fsExtra.ensureDirSync(thumbPath);

    screen
      .resize(width, height)
      .toFile(path.join(thumbPath, thumbName))
      .then(() => {
        resolve();
      })
      .catch(err => {
        error(`Error in Thumb Maker: \n${err}`);
        reject();
        process.exit(0)
      });
  });
};
