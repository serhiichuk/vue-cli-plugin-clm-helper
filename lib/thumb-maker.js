const path = require('path');
const sharp = require('sharp');
const {paths} = require('./config');
const {logWithSpinner, error} = require('@vue/cli-shared-utils');

module.exports = (size = {width, height}, file = {
  path: process.env.VUE_APP_OUT_DIR_PATH,
  name: process.env.VUE_APP_OUT_HTML_NAME
}) => {

  logWithSpinner(`Create thumbs...`);

  const screen = sharp(path.join(paths.screens, process.env.VUE_APP_SL_PATH, `${process.env.VUE_APP_SL_ID}.png`)).ignoreAspectRatio();

  screen
    .resize(size.width, size.height)
    .toFile(path.join(file.path, file.name))
    .then(() => logWithSpinner(`Create: ../${file.path}/${file.name}`))
    .catch(err => {
      error(`Error in Thumb Maker: \n${err}`)
    });
};
