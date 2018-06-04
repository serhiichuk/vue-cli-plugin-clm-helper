import Vue from 'vue'
import Router from 'vue-router'
import { structure } from '@/clm.config'

Vue.use(Router);

const routes = [{ path: '/', component: () => import('@/components/development-page') }];

structure.forEach(sl => {
  routes.push({
    path: `/${sl.id}`,
    component: () => import(`@/${sl.path}`)
  })
});

export default new Router({
  routes
});