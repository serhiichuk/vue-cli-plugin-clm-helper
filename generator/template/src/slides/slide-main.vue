<template>
  <div>
    <p>Slide Main</p>
    <h1>{{this.$store.state.lang}}</h1>
    <router-link to="/slide-1_1">slide-main</router-link>
    <router-link to="/">Dev Page</router-link>

  </div>
</template>

<script>
  import mixins from '@/app/mixins'

  export default {
    mixins: [mixins.slide],

  }
</script>

<style scoped>

</style>
