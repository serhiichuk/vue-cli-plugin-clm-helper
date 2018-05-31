
/**
 * The file enables `@/app/clm` to import all CLM modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/);
let clm;

files.keys().forEach(path => {
  const key = path.replace(/(\.\/|\.js)/g, '');

  if (key !== 'index.js' && key === (process.env.VUE_APP_CLM || 'dev')) {
    clm = files(path).default
  }
});

export default clm
