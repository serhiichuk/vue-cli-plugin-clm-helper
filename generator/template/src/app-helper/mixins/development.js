import globalCommonMixin from './common/global'
import appCommonMixin from './common/app'
import slideCommonMixin from './common/slide'

import Router from '@/app-helper/router'
import getSlideObjectById from '@/app-helper/utils/get-slide-object-by-id'
import merge from '../utils/deep-merge'

/**
 * Mixin for all components
 * include basic functionality for all components, must be an Object
 *
 * Required: navigateTo, addData
 */
export const global = merge({
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
}, globalCommonMixin);


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
      DevElements: () => import(/* webpackChunkName: "dev-elem" */ '@/app-helper/components/development-elements'),
    },
    methods: {
      swipePreventMethod(swipe) {
        console.log(`[APP] Prevent ${swipe} swipe.`);
      },
    },
  },
];
