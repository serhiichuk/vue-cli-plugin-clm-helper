/**
 * The file enables return all scss/sass files to import as one sass module
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const fs = require('fs');
const {width, height} = require('../../clm.config').device.resolution;

module.exports = fs.readdirSync(__dirname).map(file => {
  // Include resolution
  if (file === 'variables.scss') {
    return fs.readFileSync(`${__dirname}\\${file}`, 'utf8')
      .replace('29051994em', width + 'px;')
      .replace('29051994rem', height + 'px;')
  }

  return /\.s(a|c)ss$/g.test(file) // Check if file extension is .sass or .scss
    ? fs.readFileSync(`${__dirname}\\${file}`, 'utf8')
    : '';
}).join('\n');
