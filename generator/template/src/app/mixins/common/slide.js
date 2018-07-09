import getSlideObjectById from '@/app/utils/get-slide-object-by-id'

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
    this.$store.commit('SET_CURRENT_SLIDE', this.slide);

    /**
     * Import text data for current slide
     * Slides data must contain in 'src/data/[lang]/[slide.id].js'
     **/

    const dataPath = this.slide.path.replace(/^slides/, this.$store.state.currentLang);
    import(/* webpackChunkName: "[request]" */ '@/data/' + dataPath)
      .then(m => this.data = m.default || m)
      .then(m => this.$store.commit('SET_CURRENT_DATA', m.default || m))
  },
}
