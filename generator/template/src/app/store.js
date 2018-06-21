import Vue from 'vue'
import Vuex from 'vuex'
import {languages, structure} from '@/clm.config'

Vue.use(Vuex);

const isDev = process.env.NODE_ENV === 'development';
const store = new Vuex.Store({
  state: {
    languages,
    currentLang: isDev
    ? sessionStorage.getItem('current-lang') || languages[0]
    : process.env.VUE_APP_SL_LANG,

    currentSlide: {
      id: '',
      path: '',
      name: ''
    },
    
    currentData: {
      content: {},
      popup: {}
    }
  },

  structure: state => {
    return structure.map(sl => {
      const newSl = {
        ...sl,
        name: typeof sl.name === 'string' ? sl.name : sl.name[state.currentLang]
      };

      if (sl.flowName) {
        newSl.flowName = typeof sl.flowName === 'string' ? sl.flowName : sl.flowName[state.currentLang]
      }

      return newSl
    });
  }

  mutations: {
    SET_LANG(state, currentLang) {
      if (state.languages.indexOf(currentLang) === -1 && isDev) {
        console.error(`[Error]: Can't find lang "${currentLang}" in project languages: "${state.languages.join(', ')}"`)
      } else {
        state.currentLang = currentLang;
        sessionStorage.setItem('current-lang', currentLang)
      }
    },

    SET_CURRENT_SLIDE(state, currentSlide) {
      state.currentSlide = currentSlide;
    },

    SET_CURRENT_DATA(state, currentData) {
      state.currentData = {...state.currentData, ...currentData};
    }
  }
});


// Set or get booleans in session storage
const storage = {
  setValue(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getValue(key) {
    return JSON.parse(sessionStorage.getItem(key))
  }
};

if (isDev) {
  store.registerModule('dev', {
    namespaced: true,

    state: {
      isActiveDevHelpers: storage.getValue('show-development-helpers'),
      clmSystemElements: {
        'veeva': storage.getValue('show-system-elements-veeva'),
        'pharma-touch': storage.getValue('show-system-elements-pharma-touch'),
        'mi-touch': storage.getValue('show-system-elements-mi-touch')
      }
    },

    mutations: {
      TOGGLE_DEV_HELPERS(state) {
        state.isActiveDevHelpers = !state.isActiveDevHelpers;
        storage.setValue('show-development-helpers', state.isActiveDevHelpers);
      },

      SET_CLM_SYSTEM_ELEMENTS(state, payload) {
        state.clmSystemElements = {...state.clmSystemElements, ...payload};
        Object.keys(payload).forEach(key => storage.setValue(`show-system-elements-${key}`, payload[key]));
      }
    }
  })
}
export default store;
