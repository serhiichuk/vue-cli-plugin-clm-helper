import slideCommonMixin from './common/slide'
import appCommonMixin from './common/app'

import { getFullId } from '@/app/utils/sl-id-parser'
import desktopNavigationBeyondRootDir from '@/app/utils/desktop-navigation-beyond-root-dir'

/**
 * Mixin for all components
 * include basic functionality for all components
 *
 * Required: navigateTo, addData
 */
export const global = [
  {
    methods: {
      navigateTo(id) {
        id = getFullId(id);

        try {
          window.parent.navigateToSequence(id);
        } catch (err) {
          desktopNavigationBeyondRootDir(id, false /* replaceHtmlName */);
        }
      },

      addData(id, value) {
        window.parent.addData(id, value);
      },

      openPdfIos(pdfPath) {
        window.parent.PDFHelper.OpenPDF(pdfPath, window, true);
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
    methods: {
      swipePreventMethod(swipe) {
        const el = document.getElementById('app');
        if (swipe === 'next') el.dataset.preventLeftSwipe = 'true';
        if (swipe === 'prev') el.dataset.preventRightSwipe = 'true';
      },
    },

    created() {
      document.addEventListener("selectstart", function () {
        e.preventDefault();
      }, false);
    },
  },
];
