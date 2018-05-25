/**
 * The file enables return all scss/sass files to import as one sass module
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const fs = require('fs');

module.exports = fs.readdirSync(__dirname).map(file => {
  return /\.s(a|c)ss$/g.test(file) // Check if file extension is .sass or .scss
    ? fs.readFileSync(`${__dirname}\\${file}`, 'utf8')
    : '';
}).join('\n');
