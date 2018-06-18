<template>
  <div id="app" :class="[currentSlide.id, currentClm]">
    <router-view/>
    <DevElements v-if="isDev"/>
  </div>
</template>

<script>
  import "@/style/main.scss";
  const isDev = process.env.NODE_ENV === 'development';

  export default {
    data: () => ({isDev}),
    components: {
      DevElements: isDev ? () => import('@/components/development-elements') : false,
    },
    computed: {
      ...mapState(['currentSlide']),
      currentClm() {
        return isDev ?  false : process.env.VUE_APP_CLM
      }
    }
  }
</script>

<style lang="scss">

  body, html {
    position: relative;
    width: $width;
    height: $height;

    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #app, #content {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
  }


</style>
