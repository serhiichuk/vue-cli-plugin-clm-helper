const isDev = process.env.NODE_ENV === 'development';

export default {
  /**
   * This object will added each vue instance
   * and, this keys will overwrite clm-instance keys in @/app/clm
   */
  global: {},


  /**
   * This object will added to each 'slide-component' instance
   * for adding this options to other components
   * just import mixin and include it => mixins: [mixins.slide]
   */
  slide: {
    data() {
      return {
        slide: {
          id: '',
          path: ''
        },
        data: {
          content: {},
          popup: {}
        }
      }
    },
    computed: {
      t() {
        return this.data.content
      }
    },
    created() {

      /**
       * All 'slide-components' must contains in 'src/slides'
       * you can create difference folder structure in 'slides' directory,
       * just describe that in 'clm.structure.js'
       *
       * Each 'slide-component' must be named under rule: 'slide-[flow-num|name]_[slide-num].vue'
       */
      if (isDev) {
        const componentPath = this.$options.__file;
        const isSlide = /(?=.*slides(\\|\/))(?=.*slide-)/gi.test(componentPath); // match 'slides\' and 'slide-';

        if (isSlide) {
          this.slide.id = componentPath.split('\\').pop().replace(/\.vue$/gi, '');
          this.slide.path = componentPath.replace(/(?:^src\\)|(?:\.vue)/gi, '').replace(/\\/g, '/');

        } else {
          // This code will run when this mixin was included in 'non-slide-component;
          console.warn('[Info]: Options "slide.id" and "slide.path" was\'t set. ' +
            '\nComponent "${componentPath}" is\'t "slide-component." ' +
            '\nRead info in "src/mixins.js"');
        }

      } else {
        this.slide.id = process.env.VUE_APP_SL_ID;
        this.slide.path = process.env.VUE_APP_SL_PATH;
      }


      /**
       * Import text data for current slide
       * Slides data must contain in 'src/data/[lang]/[slide.id].js'
       **/

      const dataPath = this.slide.path.replace(/^slides/, this.$store.state.currentLang);
      import(/* webpackChunkName: "data" */ '@/data/' + dataPath).then(m => this.data = m.default)
    }
  }
};
