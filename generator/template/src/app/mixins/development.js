import slideCommonMixin from './common/slide'
import appCommonMixin from './common/app'

import Router from '@/app/router'
import getSlideObjectById from '@/app/utils/get-slide-object-by-id'


/**
 * Mixin for all components
 * include basic functionality for all components
 *
 * Required: navigateTo
 */
export const global = [
  {
    methods: {
      /**
       * @param id <String>
       */
      navigateTo(id) {
        // Check is slide exist in structure
        getSlideObjectById(id);
        Router.push(`/${id}`);
      },
    },

    // created() {
    //   global.setLang = (lang) => {
    //     this.$store.commit('SET_LANG', lang)
    //   }
    // }
  },
];

/**
 * This object will added to each 'slide-component' instance
 */
export const slide = [
  slideCommonMixin,
];


/**
 * Mixin for App.vue component,
 *
 * Required: swipePreventMethod
 */
export const app = [
  appCommonMixin,

  {
    data() {
      return {
        isDev: true,
      }
    },
    components: {
      DevElements: () => import('@/components/development-elements'),
    },
    methods: {
      swipePreventMethod(swipe) {
        console.log(`[APP] Prevent ${swipe} swipe.`);
      },
    },
  },
];
