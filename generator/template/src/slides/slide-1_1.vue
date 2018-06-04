<template>
  <div>
    <h1>{{$store.state.lang}}</h1>
    <p>{{data}}</p>
    <JsonToDom :json="t" :bem="true" root-class-name="weex"/>
  </div>
</template>

<script>
  import {slide} from '@/app/mixins'
  import JsonToDom from '../components/json-to-dom';

  export default {
    mixins: [slide],
    components: {
      JsonToDom
    }
  }
</script>

<style lang="scss" scoped>

</style>
