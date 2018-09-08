<template>
  <div id="content">
    <h1 class="title" v-html="t.title"></h1>

  </div>
</template>

<script>
  import mixins from '@/app-helper/mixins'

  export default {
    mixins: [...mixins.slide],
  }
</script>

<style lang="scss" scoped>
  $url: '<%= src +"/assets/images/"+ slide.path %>';

  #content {
    //background-image: url($url + '/bg.jpg');
  }
</style>
