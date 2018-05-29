const {paths} = require('../config');
const {clm, languages} = require(paths.clm.config);

exports.getFullId = (id, lang) => {
  return `${clm.productId}_${lang.toUpperCase()}_${id}`
};

exports.parseSlId = (id) => {
  return {
    productId: id.slice(0, new RegExp(`_${languages.join('|')}_slide-`, 'i').exec(id).index),
    slideId: id.slice(/_slide-/.exec(id).index + 1),
    lang: new RegExp(languages.join('|'), 'i').exec(id)[0]
  }
};
