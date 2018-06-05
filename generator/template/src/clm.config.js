module.exports = {
  // CLM platform options
  clm: {
    productId: 'TEST_C2_18' // => [PROJECT-NAME]_[CYCLE]_[YEAR]
  },

  // valid values: ua, ru, en
  languages: ['ua', 'ru'],

  device: {
    resolution: {
      width: 2048,
      height: 1536
    }
  },

  // Each object must have following keys: 'id', 'path', 'name'
  structure: [
    {
      id: 'slide-main',
      path: 'slides/slide-main',
      name: {ua: 'Назва', ru: 'Название'}
    }
  ]
};
