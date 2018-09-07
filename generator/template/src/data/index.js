import Store from '@/app-helper/store'

/**
 * The file return necessary data file for current lang in a one-shot manner.
 * There should not be any reason to edit this file.
 */
export default (path) => {
  const lang = Store.state.currentLang;
  const data = require(`./${lang}${path[0] === '/' ? path : '/' + path}`);
  return data.default || data
}
