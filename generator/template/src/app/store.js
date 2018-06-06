import Vue from 'vue'
import Vuex from 'vuex'
import {languages} from '@/clm.config'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    languages,
    currentLang: sessionStorage.getItem('current-lang') || languages[0],
    isActiveDevHelpElements: sessionStorage.getItem('show-dev-help-elements'),
    clmSystemElements: {
      'veeva': sessionStorage.getItem('show-system-elms-veeva'),
      'pharma-touch': sessionStorage.getItem('show-system-elms-pharma-touch'),
      'mi-touch': sessionStorage.getItem('show-system-elms-mi-touch')
    },
  },
  mutations: {
    SET_LANG(state, currentLang) {
      if (state.languages.indexOf(currentLang) === -1 && process.env.NODE_ENV === 'development') {
        console.error(`[Error]: Can't find lang "${currentLang}" in project languages: "${state.languages.join(', ')}"`)
      } else {
        state.currentLang = currentLang;
        sessionStorage.setItem('current-lang', currentLang)
      }
    },

    TOGGLE_DEV_HELP_ELEMENTS(state) {
      state.isActiveDevHelpElements = !state.isActiveDevHelpElements;
      sessionStorage.setItem('show-dev-help-elements', !state.isActiveDevHelpElements + '');
    },

    SET_CLM_SYSTEM_ELEMENTS(state, payload) {
      state.clmSystemElements = {...state.clmSystemElements, ...payload};

      Object.keys(payload).forEach(key => {
        sessionStorage.setItem(`show-system-elms-${key}`, payload[key])
      });
    }
  }
})
