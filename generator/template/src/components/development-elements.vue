<template>
  <div class="development-elements">
    <div class="languages">
      <div v-for="lang in languages" :key="lang" :class="`lang-${lang}`" @click="SET_LANG(lang)">{{lang}}</div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "development-elements",
    computed: {
      ...mapState(['languages'])
    },
    methods: {
      ...mapMutations(['SET_LANG'])
    },
  }
</script>

<style lang="scss" scoped>
  .development-elements {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
  }

  .languages {

  }
</style>
