import Vue from 'vue'
import Vuex from 'vuex'
import {languages} from '@/clm.config'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    languages,
    lang: sessionStorage.getItem('lang') || languages[0],
  },
  mutations: {
    SET_LANG(state, lang) {
      if (state.languages.indexOf(lang) === -1 && process.env.NODE_ENV === 'development') {
        console.error(`[Error]: Can't find lang "${lang}" in project languages: "${state.languages.join(', ')}"`)
      } else {
        state.lang = lang;
        sessionStorage.setItem('lang', lang)
      }
    }
  }
})
