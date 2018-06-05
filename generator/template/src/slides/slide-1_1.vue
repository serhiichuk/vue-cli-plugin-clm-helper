<template>
  <div>
    <h1>{{$store.state.lang}}</h1>
    <p>{{data}}</p>
    <button @touchend="navigateTo('slide-main')">slide-main</button>
    <JsonToDom :json="t" :bem="true" root-class-name="weex"/>
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
