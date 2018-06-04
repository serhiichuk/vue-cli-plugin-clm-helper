/**
 * The file enables `@/app/router` to import necessary router
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const routerFile = process.env.NODE_ENV === 'development'
 	? 'dev' 
 	: 'prod';

export default require(/* webpackChunkName: "[request]" */ './' + routerFile).default;
