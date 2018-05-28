#!/usr/bin/env node

const commands = {
  generate: {
    description: 'Generate each slide component',
    usage: 'yarn/npm generate'
  },

  data: {
    description: 'Util for data',
    usage: 'yarn/npm data <optios>',
    options: {
      '--ru': ``
    }
  },

  'build-clm': {
    description: 'Build CLM for production',
    usage: 'yarn/npm build <clm> [clm-name] <options> [option]',
    options: {
      '--clm': ``,
      '--options': ``
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
