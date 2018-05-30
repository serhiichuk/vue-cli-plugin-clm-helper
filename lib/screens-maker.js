const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const Nightmare = require('nightmare');
const {spawn} = require('child_process');
const {paths} = require('../lib/config');
const {device, languages} = require(paths.clm.config);
const {
  hasYarn,
  info,
  logWithSpinner,
  stopSpinner,
} = require('@vue/cli-shared-utils');

const port = '4444';
const mode = 'development';

module.exports = async (slidesToBuild) => {

  logWithSpinner(`Creating screens for each slide...`);

  /** Start server for testing **/
  const testServer = new TestServer(port, mode);
  await testServer.start();

  /** Create screens of all slides **/
  await screenAllSlides(slidesToBuild);

  /** Problem: I can't stop child process **/
  // testServer.stop();


  return new Promise(resolve => {
    resolve();
  });
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
    this.childProcess = () => {
    };
  }

  start() {
    return new Promise(resolve => {
      logWithSpinner(`Starting server for testing...`);

      const packageManager = hasYarn ? 'yarn' : 'npm';
      const args = [
        '--port', this.port,
        '--mode', this.mode
      ];
      const command = `${packageManager} run dev`;

      this.childProcess = spawn(command, args, {shell: true, detached: false});
      process.stdin.pipe(this.childProcess.stdout);

      this.childProcess.on('error', function (err) {
        throw err;
      });

      this.childProcess.stdout.on('data', data => {
        if (/done/i.test(data.toString())) {
          stopSpinner();
          info(`Server for testing is ready on port:${this.port}`);
          resolve();
        }
      });
    })
  }


  // NOT WORKING, but server will stop after build
  stop() {
    // this.childProcess.kill('SIGINT');
    // process.kill(this.childProcess.pid, 'SIGINT');
    // exec(`taskkill -F -PID ${this.childProcess.pid}`)
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
async function screenAllSlides(slidesToBuild) {
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


  languages.forEach(lang => fsExtra.ensureDir(path.join(paths.screens, lang)));

  for (let sl of slidesToBuild) {
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
      .wait(200)
      .evaluate(() => document.querySelector('.development-elements').style.opacity = '0')
      .click(`.lang-${sl.lang}`)
      .wait(100)
      .screenshot()
      .then(buffer => {
        logWithSpinner(`Screen save to: ../${screenName}`);
        fs.writeFileSync(path.join(paths.screens, sl.lang, screenName), buffer);
        resolve();
      })
      .catch(err => reject(err))
  })
}
