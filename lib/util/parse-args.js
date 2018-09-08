const { error } = require('@vue/cli-shared-utils');

module.exports = (args, commands) => {

  const result = {};

  for (let command in commands) {
    // Command can be long '--clm' or short '-c'
    args[command] = args[command] || args[command[0]];
    // Set validated commands to necessary key in 'result'
    result[command] = {};


    // filter can be any string value
    if (command === 'filter' || command === 'lang') {
      result[command] = new RegExp(args[command], 'i')
    }

    for (const key in  commands[command]) {
      const optionShort = key;
      const optionLong = commands[command][optionShort];

      if (typeof args[command] === "string") {
        const commandOptions = args[command].split(',');

        if (commandOptions.includes(optionShort) || commandOptions.includes(optionLong)) {
          result[command][optionLong] = true
        }
      }
    }
  }

  return result;
};
