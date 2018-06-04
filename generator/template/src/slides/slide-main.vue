<template>
  <div>
    <h1>{{$store.state.lang}}</h1>
    <!--<JsonToDom :json="t"/>-->
  </div>
</template>

<script>
  import {slide} from '@/app/mixins'
  // import JsonToDom from '../components/json-to-dom';

  export default {
    mixins: [slide],
    components: {
      // JsonToDom
    }
  }
</script>

<style scoped>

</style>
