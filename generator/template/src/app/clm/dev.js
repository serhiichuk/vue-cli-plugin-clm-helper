import Router from '@/app/router'

export default {
  created() {
    console.log('LOL')
  },
  methods: {
    navigateTo(id) {
      Router.push(`/${id}`)
    }
  }
}
