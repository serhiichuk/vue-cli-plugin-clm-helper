const {paths} = require('../config');
const {clm} = require(paths.clm.config);

exports.getFullId = (id, lang) => {
  return `${clm.productId}_${lang.toUpperCase()}_${id}`
};

exports.parseSlId = (id) => {
  return {
    productId: id.slice(0, /_(ua|ru)_slide-/i.exec(id).index),
    slideId: id.slice(/_slide-/.exec(id).index + 1),
    lang: /(ua|ru)/i.exec(id)[0]
  }
};
