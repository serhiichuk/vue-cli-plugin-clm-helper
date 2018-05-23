
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

  build: {
    description: 'Build CLM for production',
    usage: 'yarn/npm build <clm-name> [options]',
    options: {
      '--veeva': ``,
      '--no-screens': ``,
      '--no-clear-assets': ``
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
