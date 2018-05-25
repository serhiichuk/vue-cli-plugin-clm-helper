<template>
  <div>
    <p>Slide 1</p>
    <h1>{{$store.state.lang}}</h1>
    <JsonToDom :json="t"/>
    <router-link to="/slide-main">slide-main</router-link>
    <router-link to="/">Dev Page</router-link>
  </div>
</template>

<script>
  import mixins from '@/app/mixins'
  import JsonToDom from '../components/json-to-dom';

  export default {
    mixins: [mixins.slide],
    components: {
      JsonToDom
    }
  }
</script>

<style lang="scss" scoped>

</style>
