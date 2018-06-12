import Router from '@/app/router'

export default {
  methods: {
    navigateTo(id) {
      Router.push(`/${id}`)
    }
  },
  created() {
    global.setLang = (lang) => {
      this.$store.commit('SET_LANG', lang)
    }
  }
}
