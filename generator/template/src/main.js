import Vue from 'vue'
import App from '@/App'
import store from '@/app-helper/store'
import router from '@/app-helper/router'
import mixins from '@/app-helper/mixins'

/* Include Plugins */
import Vue2TouchEvents from 'vue2-touch-events'
// import MtPlugin from 'vue-clm-helper-mi-touch'

Vue.use(Vue2TouchEvents, { swipeTolerance: 80 });
// Vue.use(MtPlugin, store);

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.mixin(mixins.global);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
