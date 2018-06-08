<template>
  <div id="app">
    <router-view/>
    <DevElements v-if="isDev"/>
    <JsonToHtml :json="{title: {foo: 'baz', 'baz': 'foo'}}" root-class-name="hceses"/>
  </div>
</template>

<script>
  import JsonToHtml from './components/json-to-html'
  const isDev = process.env.NODE_ENV === 'development';

  export default {
    data: () => ({isDev}),
    components: {
      DevElements: isDev ? () => import('@/components/development-elements') : false,
      JsonToHtml,
    }
  }
</script>

<style lang="scss">
  @import "./style/main";

  .hceses {
    position: absolute;
    z-index: 4444;
    width: 50%;
    height: 50%;

    background-color: #999;
  }

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
