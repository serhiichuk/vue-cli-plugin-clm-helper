import Vue from 'vue'
import Router from 'vue-router'
import { structure } from '@/clm.config'

Vue.use(Router);

const isDev = process.env.NODE_ENV === 'development';

const routesDev = [ { path: '/', component: () => import('@/components/development-page') } ];

structure.forEach(sl => {
  routesDev.push({
    path: `/${sl.id}`,
    component: () => import( /* webpackChunkName: "[request]" */ `@/${sl.path}`),
  })
});


// Don't delete!
// read: https://github.com/webpack/webpack/issues/4807#issuecomment-354082841
const path = process.env.VUE_APP_SL_PATH;

const routesProd = [ {
  path: '/',
  component: () => import(/* webpackChunkName: "[request]" */ `@/${path}`),
} ];

export default new Router({
  routes: isDev ? routesDev : routesProd,
});
