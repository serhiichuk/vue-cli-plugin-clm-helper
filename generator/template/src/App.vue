<template>
  <div id="app">
    <router-view/>
    <DevElements v-if="isDev"/>
  </div>
</template>

<script>
  const isDev = process.env.NODE_ENV === 'development';

  export default {
    data() {
      return {
        isDev
      }
    },
    components: {
      DevElements: isDev ? () => import('@/components/development-elements') : false
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
