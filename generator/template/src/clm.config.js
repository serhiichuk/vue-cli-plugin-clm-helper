module.exports = {
  clm: {
    productId: 'TEST_C2_18', // => <PROJECT-NAME>_<CYCLE>_<YEAR>
    disableSwipeBetweenFlows: true // Auto preventing swipes between flows
  },

  languages: ['ua', 'ru'], // Valid values: ua, ru, en

  device: {
    resolution: {
      width: 1280,
      height: 720
    }
  },

  // Required keys: 'id', 'path', 'name'.
  // Optionally keys: 'flowName', 'swipe'
  structure: [
    {
      id: 'slide-main',
      path: 'slides/slide-main',
      name: {ua: 'Назва', ru: 'Название'},
    },

    {
      id: 'slide-1_1',
      path: 'slides/slide-1_1',
      name: {ua: 'Назва', ru: 'Название'},
      flowName: {ua: 'Flow-1 ua', ru: 'Flow-1 ru'},
      swipe: {
        next: 'slide-3_2',
        prev: 'prevent'
      }
    },
    {
      id: 'slide-1_2',
      path: 'slides/slide-1_2',
      name: {ua: 'Назва', ru: 'Название'},
    },


    {
      id: 'slide-2_1',
      path: 'slides/slide-2_1',
      name: {ua: 'Назва', ru: 'Название'},
      flowName: 'Flow - 2',
      swipe: {
        prev: 'slide-1_1'
      }
    },
    {
      id: 'slide-2_2',
      path: 'slides/slide-2_2',
      name: {ua: 'Назва', ru: 'Название'},
    },


    {
      id: 'slide-3_1',
      path: 'slides/slide-3_1',
      name: {ua: 'Назва', ru: 'Название'},
    },
    {
      id: 'slide-3_2',
      path: 'slides/slide-3_2',
      name: {ua: 'Назва', ru: 'Название'},
      swipe: {
        prev: 'slide-1_1'
      }
    }
  ]
};
