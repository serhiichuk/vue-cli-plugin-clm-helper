import Vue from 'vue'
import App from '@/App'
import store from '@/app/store'
import {dev, prod} from '@/app/router'

const isDev = process.env.NODE_ENV === 'development';

// Disable dev-tools extension in production
Vue.config.productionTip = !isDev;

new Vue({
    el: '#app',
    store,
    router: isDev ? dev : prod,
    render: h => h(App)
});