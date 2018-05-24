import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'
import {dev, prod} from '@/app/router'
import data from './data'

const isDev = process.env.NODE_ENV === 'development';
console.log(data);

// Disable dev-tools extension in production
Vue.config.productionTip = !isDev;


Vue.mixin({
  data() {
    return {
      data: {}
    }
  },
  created() {
    // Run only for components who name started from 'slide-...'
    if (/^slide-/gi.exec(this.$options.name)) {
      this.$set(this.data, 't', data['ru/' + this.$options.name])
    }
  }
});

new Vue({
  el: '#app',
  store,
  router: isDev ? dev : prod,
  render: h => h(App)
});
