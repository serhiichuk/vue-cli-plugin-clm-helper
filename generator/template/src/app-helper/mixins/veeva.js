import slideCommonMixin from './common/slide'
import globalCommonMixin from './common/global';
import appCommonMixin from './common/app'

import com from 'veevalibrary'
import { getFullId } from '@/app-helper/utils/sl-id-parser'
import desktopNavigationBeyondRootDir from '@/app-helper/utils/desktop-navigation-beyond-root-dir'
import merge from '../utils/deep-merge';

/**
 * Mixin for all components
 * include basic functionality for all components, must be an Object
 *
 * Required: navigateTo, addData
 */
export const global = merge({
  methods: {
    $navigateTo(id) {
      id = getFullId(id);

      try {
        com.veeva.clm.gotoSlide(id + '.zip', '');
      } catch (err) {
        desktopNavigationBeyondRootDir(id, true /* replaceHtmlName */);
      }
    },

    $addData(id, value) {
      // Veeva data setup in clm-admin page
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
    methods: {
      swipePreventMethod(swipe) {
        // In Veeva CRM, the prevent swipe is set in the Admin panel
      },
    },

    created() {
      // Disable system vertical fucking swipe
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, true);
    },
  },
];
