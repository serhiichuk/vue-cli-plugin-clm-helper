<template>
  <div>
    <p>Slide 1</p>
    <router-link to="/slide-main">slide-main</router-link>
    <devp/>
  </div>
</template>

<script>
  import devp from '../components/development-page'

  export default {
    components: {devp}
  }
</script>

<style scoped>

</style>
