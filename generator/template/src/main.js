import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'
import {dev, prod} from '@/app/router'
import {languages} from '@/clm.config'
import allData from '@/data'

const isDev = process.env.NODE_ENV === 'development';

// Disable dev-tools extension in production
Vue.config.productionTip = !isDev;


Vue.mixin({
  data() {
    return {
      currentSlide: {},
      data: {},
      t: {}
    }
  },
  created() {
    const componentPath = this.$options.__file;
    const isSlide = /(?=.*\\slide-)(?=.*\.vue)/gi.test(componentPath);// math '\slide-' and '.vue'

    // Run only for components who name started from 'slide-...'
    if (isSlide) {
      const {currentSlide} = this;

      currentSlide.id = isDev
        ? componentPath.split('\\').pop().replace(/\.vue$/gi, '')
        : process.env.VUE_APP_SL_ID;

      currentSlide.path = isDev
        ? this.$options.__file.replace(/(?:^src\\)|(?:\.vue)/gi, '').replace(/\\/, '/')
        : process.env.VUE_APP_SL_PATH;

      const currentLanguage = sessionStorage.getItem('currentLanguage') || languages[0];
      const currentData = allData[`${currentLanguage}/${currentSlide.path.replace('slides/', '')}`];


      this.data = currentData;
      this.t = currentData.content;

    } else {
      this.data = null;
      this.t = null;
    }
  }
});

new Vue({
  el: '#app',
  store,
  router: isDev ? dev : prod,
  render: h => h(App)
});
