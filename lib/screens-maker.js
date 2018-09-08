const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const Nightmare = require('./nightmare-ewait');
const { paths } = require('../lib/config');
const { device } = require(paths.clm.config);

module.exports = async (sl) => {
  return new Promise(resolve => {
    const { width, height, scaleCoefficient } = getScreenSize();
    const nightmare = new Nightmare({
      useContentSize: true,
      enableLargerThanScreen: true,
      width: width,
      height: height,
      show: false,
      webPreferences: {
        webaudio: false,
        webSecurity: false,
        zoomFactor: scaleCoefficient,
      },
    });

    const url = `file:///${process.env.VUE_APP_OUT_DIR_PATH}/${process.env.VUE_APP_OUT_HTML_NAME}.html`;
    const screenName = `${sl.id}.png`;
    fse.ensureDir(path.join(paths.screens, process.env.VUE_APP_CLM, sl.lang));

    nightmare
      .goto(url)
      .ewait("dom-ready")
      .screenshot()
      .then(buffer => {
        fs.writeFileSync(path.join(paths.screens, process.env.VUE_APP_CLM, sl.lang, screenName), buffer);
        resolve();
      })
      .catch(err => reject(err))

  });
};


/**
 * Return maximum allowable screenshots resolution
 *
 * @returns {{scaleCoefficient: number, width: number, height: number}}
 */
function getScreenSize() {
  const { width, height } = device.resolution;
  const maxWindowSize = {
    width: 1280,
    height: 768,
  };

  let scaleCoefficient = +(maxWindowSize.height / height).toFixed(1);

  // Scale must be larger than 0.5
  // scaleCoefficient = scaleCoefficient > 0.5 ? scaleCoefficient : 0.5;
  // Scale must be less than 1
  scaleCoefficient = scaleCoefficient <= 1 ? scaleCoefficient : 1;

  return {
    scaleCoefficient,
    width: width * scaleCoefficient,
    height: height * scaleCoefficient,
  }
}

