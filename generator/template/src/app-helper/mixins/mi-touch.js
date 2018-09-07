import slideCommonMixin from './common/slide'
import globalCommonMixin from './common/global'
import appCommonMixin from './common/app'

import { getFullId } from '@/app-helper/utils/sl-id-parser'
import desktopNavigationBeyondRootDir from '@/app-helper/utils/desktop-navigation-beyond-root-dir'
import merge from '../utils/deep-merge'

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
        window.parent.navigateToSequence(id);
      } catch (err) {
        desktopNavigationBeyondRootDir(id, false /* replaceHtmlName */);
      }
    },

    $addData(id, value) {
      window.parent.addData(id, value);
    },

    $openPdfIos(pdfPath) {
      window.parent.PDFHelper.OpenPDF(pdfPath, window, true);
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
        const el = document.getElementById('app');
        if (swipe === 'next') el.dataset.preventLeftSwipe = 'true';
        if (swipe === 'prev') el.dataset.preventRightSwipe = 'true';
      },
    },
  },
];
