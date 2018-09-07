import getSlideObjectById from '@/app-helper/utils/get-slide-object-by-id'
import getData from '@/data'

const isDev = process.env.NODE_ENV === 'development';

export default {
  data() {
    return {
      slide: {},
      data: {
        content: {},
        popup: {},
      },
    }
  },
  computed: {
    t() {
      return this.data.content
    },
  },
  created() {
    const id = isDev
      ? this.$route.path.replace(/\//g, '')
      : process.env.VUE_APP_SL_ID;

    this.slide = { ...getSlideObjectById(id) };
    /**
     * Import text data for current slide
     * Slides data must contain in 'src/data/[lang]/[slide.path].js'
     */
    this.data = getData(this.slide.path);
    this.$store.commit('SET_CURRENT_SLIDE', this.slide);
    this.$store.commit('SET_CURRENT_DATA', this.data);
    this.$setSlideReady();
  },
}
