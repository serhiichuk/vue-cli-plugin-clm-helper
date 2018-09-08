const { paths } = require('../config');
const { clm, languages } = require(paths.clm.config);
const { error } = require('@vue/cli-shared-utils');

exports.getFullId = (id, lang) => {
  if (!id || !lang) throw error(`Missing required parameter "id" or "lang", \n\tYou pass: id = ${id}, lang = ${lang}`);
  return `${clm.productId}_${lang.toUpperCase()}_${id}`
};

exports.parseSlId = (id) => {
  return {
    productId: getProductId(id),
    slideId: getSlideId(id),
    lang: getSlideLang(id),
  }
};

function getProductId(id) {
  const regexResult = new RegExp(`_(${languages.join('|')})_slide-`, 'i').exec(id);

  if (!regexResult) slideIdError('Wrong', id);
  return id.slice(0, regexResult.index)
}

function getSlideId(id) {
  const regexResult = new RegExp(`_slide-`).exec(id);

  if (!regexResult) slideIdError('Wrong slide.id', id);
  return id.slice(regexResult.index + 1)
}

function getSlideLang(id) {
  const regexResult = new RegExp(languages.join('|'), 'i').exec(id);

  if (!regexResult) slideIdError('Wrong lang', id);
  return regexResult[0].toLowerCase()
}

function slideIdError(err, id) {
  error(`Slide ID parser: ${err} in: ${id}` +
    '\n\tID must be named under rule: [productId]_[lang]_[slide.id]' +
    '\n\tFor Example: [TEST_C2_18]_[UA]_[slide-1_1]');
  process.exit(0);
}
