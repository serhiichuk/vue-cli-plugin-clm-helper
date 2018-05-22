module.exports = (api, options) => {

  // register `vue-cli-service`
  api.registerCommand('generate', {
    usage: 'vue-cli-service generate',
    options: {
      '--add': `open browser on server start`,
      '--mode': `specify env mode (default: development)`
    }
  }, function generate(args) {
    require('./bin/gererate')(args)
  });

  // register `vue-cli-service`
  api.registerCommand('build', args => {
    require('./bin/build')(args);
  });

  // register `vue-cli-service`
  api.registerCommand('data', args => {
    require('./bin/data')(args);
  })
};
