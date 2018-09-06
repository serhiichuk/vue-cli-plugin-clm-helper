import globalCommonMixin from './common/global'
import appCommonMixin from './common/app'
import slideCommonMixin from './common/slide'

import Router from '@/.helper/router'
import getSlideObjectById from '@/.helper/utils/get-slide-object-by-id'

/**
 * Mixin for all components
 * include basic functionality for all components
 *
 * Required: navigateTo, addData
 */
export const global = [
  globalCommonMixin,

  {
    methods: {
      /**
       * A global method that performs the function of navigating to the desired slide.

       * @param id <String>
       */
      $navigateTo(id) {
        // Check is slide exist in structure
        getSlideObjectById(id);
        Router.push(`/${id}`);
      },

      /**
       * A global method that sends a calldialog response to the required clm database.
       *
       * @param id
       * @param value
       */
      $addData(id, value) {
        if (!id) throw new Error(`Missing required parameter: "${id}"!`);
        if (!value) throw new Error(`Missing required parameter: "${value}"!`);
        if (typeof value !== 'string') throw new Error(`Type of parameter "value" must be a "string", you pass: "${typeof value}"`);

        console.log(`[App] Write data - ID: "${id}", Value: "${value}"`);
      },

      /**
       * Function opens a PDF document in a native full screen window
       * (only for MI Touch on iOS)
       *
       * @param pdfPath
       */
      $openPdfIos(pdfPath) {
        if (pdfPath[0] === '/') throw new Error('PDF path cannot start with «/»');
        window.open(`/${pdfPath}`);
      },
    },
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
      DevElements: () => import('@/.helper/components/development-elements'),
    },
    methods: {
      swipePreventMethod(swipe) {
        console.log(`[APP] Prevent ${swipe} swipe.`);
      },
    },

    // created() {
    //   global.setLang = (lang) => {
    //     this.$store.commit('SET_LANG', lang)
    //   }
    // },
  },
];
