module.exports = {
  // CLM platform options
  clm: {
    productId: 'TEST_C2_18' // => [PROJECT-NAME]_[CYCLE]_[YEAR]
  },

  languages: ['ua', 'ru'], // valid values: ua, ru, en

  device: {
    resolution: {
      width: 1024,
      height: 768
    }
  },

  // List of all slides array of objects
  // Each object must have following keys: 'id', 'path', 'name'
  structure: [
    {
      id: 'slide-main',
      path: 'slides/slide-main',
      name: {ua: 'Назва', ru: 'Название'}
    }
  ]
};
