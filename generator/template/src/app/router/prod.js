import Vue from 'vue'
import Router from 'vue-router'
import { structure } from '@/clm.config'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    component: () => import(`@/${process.env.VUE_APP_SL_PATH}`)
  }]
});