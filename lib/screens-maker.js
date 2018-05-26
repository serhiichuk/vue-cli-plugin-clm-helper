const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const Nightmare = require('nightmare');
const {exec} = require('child_process');
const {paths} = require('../lib/config');
const {device, structure} = require(paths.clm.config);
const {
  hasYarn,
  log,
  done,
  info,
  logWithSpinner,
  stopSpinner
} = require('@vue/cli-shared-utils');

const port = '4444';
const mode = 'development';

module.exports = async () => {
  logWithSpinner(`Creating screens for each slide...`);

  /** Start server for testing **/
  const testServer = new TestServer(port, mode);
  await testServer.start();

  /** Create screens of all slides **/
  await screenAllSlides();

  /** Problem: I can't stop this process **/
  // testServer.stop();
};


/**
 *  Helpers
 */

/**
 * Class for start and stop webpackDevServer
 * Method 'start' exec npm/yarn dev with special options
 * When server ready, 'start' return Promise
 */
class TestServer {
  constructor(port, mode) {
    this.port = port;
    this.mode = mode;
  }

  start() {
    return new Promise((resolve, reject) => {
      logWithSpinner(`Starting server for testing...`);
      const packageManager = hasYarn ? 'yarn' : 'npm';
      const command = `${packageManager} run dev --port=${this.port} --mode=${this.mode}`;

      this.server = exec(command, err => {
        if (err) {
          stopSpinner();
          console.log(err);
          process.exit(1)
        }
      });

      this.server.stdout.on('data', data => {
        if (/done/i.test(data)) {
          stopSpinner();
          info(`Server for testing is ready on port:${this.port}`);
          resolve();
        }
      });
    })
  }


  stop() {
    //....Critical, process work after building
  }
}

/**
 * Return maximum allowable screenshots resolution
 *
 * @returns {{scaleCoefficient: number, width: number, height: number}}
 */
function getScreenSize() {
  const {width, height} = device.resolution;
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
    height: height * scaleCoefficient
  }
}

/**
 *
 * @returns {Promise<void>}
 */
async function screenAllSlides() {
  logWithSpinner('Create screens...');

  const {width, height, scaleCoefficient} = getScreenSize();
  const nightmare = new Nightmare({
    useContentSize: true,
    enableLargerThanScreen: true,
    width: width,
    height: height,
    show: false,
    webPreferences: {
      webaudio: false,
      webSecurity: false,
      zoomFactor: scaleCoefficient
    }
  });

  fsExtra.ensureDir(paths.screens);

  for (let sl of structure) {
    await createScreen(sl, nightmare);
  }

  stopSpinner();
  info('All screens created.')
}

function createScreen(sl, nightmare) {
  const url = `http://localhost:${port}/#/${sl.id}`;
  const screenName = `${sl.id}.png`;

  logWithSpinner(`Screen ${sl.id}`);

  return new Promise((resolve, reject) => {
    nightmare
      .goto(url)
      .wait(300)
      .screenshot()
      .then(buffer => {
        logWithSpinner(`Screen save to: ../${screenName}`);
        fs.writeFileSync(path.join(paths.screens, screenName), buffer);
        resolve();
      })
      .catch(err => reject(err))
  })
}
