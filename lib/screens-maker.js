const path = require('path');
const chalk = require('chalk');
const {exec} = require('child_process');
const {paths} = require('../lib/config');
const {device, structure} = require(paths.clm.config);

const {
  log,
  done,
  info,
  logWithSpinner,
  stopSpinner
} = require('@vue/cli-shared-utils');

module.exports = async(api, projectOptions) => {
  logWithSpinner(`Creating screens for each slide...`);

  /**
   * Start server for testing
   */
  // stopSpinner()
  const testServer = await new TestServer().startSever();


  // const testServer = exec('yarn dev --port=4444 --mode=development', (error, stdout, stderr) => {
  //   if (error) {
  //     stopSpinner();
  //     throw error;
  //   }
  //
  //   logWithSpinner(`Starting server for testing`);
  // });
  //
  // testServer.stdout.on('data', data => {
  //   if (/done/i.test(data)) {
  //     logWithSpinner(data);
  //   }
  // });
  //

  /**
   * Create screens of all slides
   */
  const resolution = getScreenSize(device.resolution);
};


/*** Helpers ***/

class TestServer {
  constructor() {
    this.port = '4444';
    this.mode = 'development';
  }

  startSever() {
    return new Promise((resolve, reject) => {
      this.server = exec(`yarn dev --port=${this.port} --mode=${this.mode}`);

      this.server.stdout.on('data', data => {

        if (/done/i.test(data)) {
          done(data);
          resolve();
        }
      });
    })
  }


  stop() {
    // this.server.kill(0);
  }

}

/**
 * Return maximum allowable screens size
 *
 * @param slideSize
 * @returns {{scaleCoefficient: number, width: number, height: number}}
 */
function getScreenSize(slideSize) {
  const maxWindowSize = {
    width: 1280,
    height: 768,
  };

  let scaleCoefficient = +(maxWindowSize.height / slideSize.height).toFixed(1);

  // Scale must be larger than 0.5
  // scaleCoefficient = scaleCoefficient > 0.5 ? scaleCoefficient : 0.5;
  // Scale must be less than 1
  scaleCoefficient = scaleCoefficient <= 1 ? scaleCoefficient : 1;

  return {
    scaleCoefficient,
    width: slideSize.width * scaleCoefficient,
    height: slideSize.height * scaleCoefficient
  }
}
