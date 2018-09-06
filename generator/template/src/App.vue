<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div id="app" :class="[currentSlide.id, clmName]" v-touch:swipe="swipeHandler">
    <router-view/>

    <!-- MI Touch Components -->
    <!--<mt-menu/>-->
    <!--<mt-popup/>-->

    <!-- Components will rendered only in development -->
    <DevElements v-if="isDev"/>
  </div>
</template>

<script>
  import '@/style/main.scss';
  import mixins from '@/.helper/mixins'

  export default {
    mixins: [ ...mixins.app ],
  }
</script>

<style lang="scss">

</style>
