/**
 * The file enables `@/app/clm` to import necessary vue-instance with special clm methods
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const clmFile = process.env.NODE_ENV === 'development' 
	? 'dev' 
	: process.env.VUE_APP_CLM;

export default require(/* webpackChunkName: "[request]" */ './' + clmFile).default;