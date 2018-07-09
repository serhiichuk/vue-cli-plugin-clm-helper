import slideCommonMixin from './common/slide'
import appCommonMixin from './common/app'

import com from 'veevalibrary'
import { getFullId } from '@/app/utils/sl-id-parser'
import desktopNavigationBeyondRootDir from '@/app/utils/desktop-navigation-beyond-root-dir'

/**
 * Mixin for all components
 * include basic functionality for all components
 *
 * Required: navigateTo
 */
export const global = [
  {
    methods: {
      navigateTo(id) {
        id = getFullId(id);

        try {
          com.veeva.clm.gotoSlide(id + '.zip', '');
        } catch (err) {
          desktopNavigationBeyondRootDir(id, true /* replaceHtmlName */);
        }
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
  },
];
