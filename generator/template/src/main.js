import Vue from 'vue'
import App from '@/App'
import clm from '@/app/clm'
import store from '@/app/store'
import router from '@/app/router'
import mixins from '@/app/mixins'

const isDev = process.env.NODE_ENV === 'development';

// Disable dev-tools extension in production
Vue.config.productionTip = !isDev;
Vue.mixin({...clm, ...mixins.global});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
