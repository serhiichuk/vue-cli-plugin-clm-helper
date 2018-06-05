import Router from '@/app/router'

export default {
  methods: {
    navigateTo(id) {
      Router.push(`/${id}`)
    }
  }
}
