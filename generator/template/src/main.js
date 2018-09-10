import Vue from 'vue'
import App from '@/App'
import store from '@/app-helper/store'
import router from '@/app-helper/router'
import mixins from '@/app-helper/mixins'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents, { swipeTolerance: 80 });
<%_ if (options['frequently-packages-answers'].includes('mt-plugin')) { _%>
Vue.use(MtPlugin, store);
<%_ } _%>
<%_ if (options['frequently-packages-answers'].includes('json-to-html')) { _%>
Vue.component('json-to-html', JsonToVue);
<%_ } _%>

Vue.mixin(mixins.global);
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
