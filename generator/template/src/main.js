import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'
import {global} from '@/app/mixins'
import router from '@/app/router'

const isDev = process.env.NODE_ENV === 'development';

// Disable dev-tools extension in production
Vue.config.productionTip = !isDev;
Vue.mixin(global);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
