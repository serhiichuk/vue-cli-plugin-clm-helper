import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'
import router from '@/app/router'
import mixins from '@/app/mixins'

/* Include Plugins */
import Vue2TouchEvents from 'vue2-touch-events'
// import MtPlugin from 'vue-clm-helper-mi-touch'

Vue.use(Vue2TouchEvents, { swipeTolerance: 80 });
// Vue.use(MtPlugin, store);

Vue.mixin(...mixins.global);
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
