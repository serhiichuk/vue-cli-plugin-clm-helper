#!/usr/bin/env node
const {hasYarn} = require('@vue/cli-shared-utils');
const pkgManager = hasYarn ? 'yarn' : 'npm';
const commands = {
  data: {
    description: 'Util for data',
    usage: `${pkgManager} data <optios>`
  },

  generate: {
    description: 'Generate each slide component',
    usage: `${pkgManager} generate [options]`,
    options: {
      '--lang, -l': `generate only necessary lang. \tEx: "ua|ru"`
    }
  },

  'build-clm': {
    description: 'Build CLM for production',
    usage: `${pkgManager} build <clm> [options] [filter] [lang]`,
    options: {
      '--clm, -c': `veeva, pharma-touch, mi-touch. \tEx: -c v,mt,pt`,
      '--options, -o': `no-screens, no-clear-assets. \t\tEx: -o ns`,
      '--filter, -f': `regex filter under slide ID. \t\tEx: slide-1_1|slide-3_3`,
      '--lang, -l': `build only necessary lang. \t\tEx: ua|ru`
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
