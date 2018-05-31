#!/usr/bin/env node
const {hasYarn} = require('@vue/cli-shared-utils');
const pkgManager = hasYarn ? 'yarn' : 'npm';
const commands = {
  generate: {
    description: 'Generate each slide component',
    usage: `${pkgManager} generate`
  },

  data: {
    description: 'Util for data',
    usage: `${pkgManager} data <optios>`
  },

  'build-clm': {
    description: 'Build CLM for production',
    usage: `${pkgManager} build <clm> [options] [filter] [lang]`,
    options: {
      '--clm': `veeva, pharma-touch, mi-touch`,
      '--options': `no-screens, no-clear-assets`,
      '--filter': `regex filter under slide ID. Ex: "slide-1_1|slide-3_3"`,
      '--lang': `build only necessary lang. Ex: "ua|ru"`
    }
  }
};

/**
 * Register each command for `vue-cli-service <command>`
 *
 * @param api
 * @param projectOptions
 */
module.exports = (api, projectOptions) => {
  for (let command in commands) {
    api.registerCommand(command, commands[command], args => {
      require(`./commands/${command}`)(api, projectOptions, args)
    });
  }
};

// make sure to specify the default mode for correct env variables
module.exports.defaultModes = {
  'build': 'production'
};
