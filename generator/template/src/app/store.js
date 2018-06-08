import Vue from 'vue'
import Vuex from 'vuex'
import {languages} from '@/clm.config'

Vue.use(Vuex);

const isDev = process.env.NODE_ENV === 'development';
// Set or get booleans in session storage
const storage = {
  setValue(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getValue(key) {
    return JSON.parse(sessionStorage.getItem(key))
  }
};

// Development Module
const development = {
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

      Object.keys(payload).forEach(key => {
        storage.setValue(`show-system-elements-${key}`, payload[key])
      });
    }
  }
};

export default new Vuex.Store({
  state: {
    ...development.state,
    languages,
    currentLang: sessionStorage.getItem('current-lang') || languages[0]
  },
  mutations: {
    ...development.mutations,
    SET_LANG(state, currentLang) {
      if (state.languages.indexOf(currentLang) === -1 && isDev) {
        console.error(`[Error]: Can't find lang "${currentLang}" in project languages: "${state.languages.join(', ')}"`)
      } else {
        state.currentLang = currentLang;
        sessionStorage.setItem('current-lang', currentLang)
      }
    }
  }
})
