import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'

const isDev = process.env.NODE_ENV === 'development';

const routerPath = isDev
  ? 'app/router/dev'
  : 'app/router/prod';

import('@/' + routerPath).then(module => {
  new Vue({
    el: '#app',
    store,
    router: module.default || module,
    components: {App},
    template: '<App/>'
  });
});
