/**
 * The file return all scss/sass files data and include '$width and $height' from 'clm.config.js'
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const fs = require('fs');

let sharedData = fs.readdirSync(__dirname).map(file => {
  return /\.s(a|c)ss$/g.test(file) // Check if file extension is .sass or .scss
    ? fs.readFileSync(`${__dirname}\\${file}`, 'utf8')
    : '';
}).join('\n');

// Include resolution
const {width, height} = require('../../clm.config').device.resolution;

sharedData += `$width: ${width}px;`;
sharedData += `$height: ${height}px;`;

module.exports = sharedData;
