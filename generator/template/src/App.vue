<template>
  <div id="app" :class="[currentSlide.id, clmName]" v-touch:swipe="swipeHandler">
    <router-view/>

    <%_ if (options['frequently-packages-answers'].includes('mt-plugin')) { _%>
    <mt-menu/>
    <mt-popup/>
    <%_ } _%>

    <!-- Components will rendered only in development -->
    <DevElements v-if="isDev"/>
  </div>
</template>

<script>
  import '@/style/main.scss';
  import mixins from '@/app-helper/mixins'

  export default {
    mixins: [ ...mixins.app ],
  }
</script>

<style lang="scss">

</style>
