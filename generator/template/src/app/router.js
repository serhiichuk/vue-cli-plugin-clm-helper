import Vue from 'vue'
import Router from 'vue-router'
import {structure} from '@/clm.config'

Vue.use(Router);

const routes = [{path: '/', component: () => import ('@/components/development-page')}];

structure.forEach(sl => {
  routes.push({
    path: `/${sl.id}`,
    component: () => import(`@/${sl.path}`)
  })
});

export const dev = new Router({
  routes
});

export const prod = new Router({
  routes: [{
    path: '/',
    component: () => import(`@/${process.env.VUE_APP_SL_PATH}`)
  }]
});
