import Router from '@/app/router'
import { getFullId } from '../utils/sl-id-parser';

export default {
  created() {
    console.log('LOL')
  },
  methods: {
    navigateTo(id) {
      console.log(getFullId(id, this.$store.state.lang));
      // Router.push(`/${id}`)
    }
  }
}
