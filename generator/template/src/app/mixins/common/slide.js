import getSlideObjectById from '@/app/utils/get-slide-object-by-id'
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
     * Slides data must contain in 'src/data/[lang]/[slide.id].js'
     **/
    this.data = getData(this.slide.path.replace(/^slides/, ''));
    this.$store.commit('SET_CURRENT_SLIDE', this.slide);
  },
}
