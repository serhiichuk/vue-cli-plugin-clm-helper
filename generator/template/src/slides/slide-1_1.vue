<template>
  <div>
    <h1>{{$store.state.lang}}</h1>
    <JsonToDom :json="t"/>
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
