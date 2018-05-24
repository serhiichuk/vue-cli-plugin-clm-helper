module.exports = {
  // CLM platform options
  clm: {
    name: 'veeva', // valid values: 'veeva' | 'mi-touch' | 'pharma-touch'
    productID: 'TEST_C2_18' // => [PROJECT-NAME]_[CYCLE]_[YEAR]
  },

  languages: ['ua', 'ru'], // valid values: 'ua', 'ru', 'en'

  device: {
    name: 'ipad', // valid values: 'ipad' | 'android' | 'windows'
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
    },
    {
      id: 'slide-1_1',
      path: 'slides/slide-1_1',
      name: {ua: 'Назва', ru: 'Название'}
    }
  ]
};
