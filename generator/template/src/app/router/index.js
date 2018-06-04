/**
 * The file enables `@/app/clm` to import all CLM modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/);
const routerFile = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
let router;


files.keys().forEach(path => {
  const key = path.replace(/(\.\/|\.js)/g, '');

  if (key !== 'index.js' && key === routerFile) {
    router = files(path).default
  }
});

export default router
