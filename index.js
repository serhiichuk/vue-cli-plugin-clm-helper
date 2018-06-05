#!/usr/bin/env node
const {hasYarn} = require('@vue/cli-shared-utils');
const pkgManager = hasYarn ? 'yarn' : 'npm';
const commands = {
  // data: {
  //   description: 'Util for data',
  //   usage: `${pkgManager} data <optios>`
  // },

  generate: {
    description: 'Generate each slide component',
    usage: `${pkgManager} generate [options]`,
    options: {
      'Full:': '  Description: \t\t\tExample:',
      '--lang': `\tgenerate only necessary lang. \t-l "ua|ru"`
    }
  },

  'build-clm': {
    description: 'Build CLM for production',
    usage: `${pkgManager} build <clm> [options] [filter] [lang]`,
    options: {
      'Full:': '  Description: \t\t\tExample:',
      '--clm': `\tveeva, pharma-touch, mi-touch. \t-c v,mt,pt`,
      '--options': `\tno-screens, no-clear-assets. \t-o ns`,
      '--filter': `\tregex filter under slide ID. \t-f "slide-1_1|slide-3_3"`,
      '--lang': `\tbuild only necessary lang. \t-l "ua|ru"`
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
