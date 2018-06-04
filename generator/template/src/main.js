import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'
import router from '@/app/router'
import {global} from '@/app/mixins'

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
