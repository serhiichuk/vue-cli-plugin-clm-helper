/**
 * The file enables `@/app-helper/clm` to import necessary vue-instance with special clm methods
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const clmFile = process.env.NODE_ENV === 'development'
  ? 'development'
  : process.env.VUE_APP_CLM;

const module = require(/* webpackChunkName: "[request]" */ './' + clmFile);
export default module.default || module;
