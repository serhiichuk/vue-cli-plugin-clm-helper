import allData from '@/data'

const isDev = process.env.NODE_ENV === 'development';

export default {
  /**
   * This object will added all vue instance
   */
  global: {
  },


  /**
   * This object will added to each 'slide-component' instance
   * for adding this options to other components
   * just import mixin and include it => mixins: [mixins.slide]
   */
  slide: {
    data() {
      return {
        slide: {},
      }
    },
    computed: {
      data() {
        return allData[this.slide.path.replace(/^slides/, this.$store.state.lang)]
      },
      t() {
        return this.data.content
      }
    },
    created() {
      /**
       * All 'slide-components' contains in 'src/slides'
       * you can create difference folder structure in 'slides' directory,
       * just describe that in 'clm.structure.js'
       *
       * Each 'slide-component' must be named under rule: 'slide-[flow-num|name]_[slide-num].vue'
       */

      const componentPath = this.$options.__file;
      const isSlide = /(?=.*\\slide-)(?=.*\.vue)/gi.test(componentPath); // match '\slide-' and '.vue'

      if (isSlide) {
        this.slide.id = isDev
          ? componentPath.split('\\').pop().replace(/\.vue$/gi, '')
          : process.env.VUE_APP_SL_ID;

        this.slide.path = isDev
          ? componentPath.replace(/(?:^src\\)|(?:\.vue)/gi, '').replace(/\\/, '/')
          : process.env.VUE_APP_SL_PATH;

      } else { // This code will run when this mixin was included in 'non-slide-component;
        if (isDev) {
          console.warn(
  `[Info]: Options "slide.id" and "slide.path" was't set. 
  Component "${componentPath}" is't "slide-component."
  Read info in "src\\mixins.js"`);
        }
      }
    }
  }
}
