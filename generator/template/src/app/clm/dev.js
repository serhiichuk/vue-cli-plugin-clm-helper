import router from '../router'

const navigation = {
  navigateTo(id) {
    router.push(`/${id}`)
  }
};

export default {
  navigation
}
