<template>
  <div id="content">
    <h1 class="title" v-html="t.title"></h1>

  </div>
</template>

<script>
  import mixins from '@/app/mixins'

  export default {
    mixins: [ ...mixins.slide ],
  }
</script>

<style lang="scss" scoped>

</style>
