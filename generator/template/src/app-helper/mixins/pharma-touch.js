import slideCommonMixin from './common/slide'
import globalCommonMixin from './common/global';
import appCommonMixin from './common/app'

import { getFullId } from '@/app-helper/utils/sl-id-parser'
import { getOperatingSystem } from '@/app-helper/utils/get-system-info'
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
      id = `${getFullId(id)}.html`;

      switch (getOperatingSystem()) {
        case 'Android' :
          Android.openSlide(id);
          break;
        case 'iOS':
          window.location.href = id;
          break;

        default:
          try {
            Android.openSlide(id);
          } catch (err) {
            window.location.href = id;
          }
      }
    },

    $addData(id, value) {
      console.log(`${id}=${value}`);
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
        // API Pharma Touch does not support prevent swipe method
      },
    },
  },
];
