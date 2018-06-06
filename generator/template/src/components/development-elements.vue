<template>
  <div class="development-elements">

    <section class="development-help-elements" v-if="isActiveDevHelpElements">

      <div class="nav">
        <div class="nav-dev-page">Dev</div>
        <div class="nav-prev">Next Slide</div>
        <div class="nav-next">Prev Slide</div>
      </div>

      <div class="languages" v-if="languages.length > 0">
        <button v-for="lang in languages" :key="lang"
                :class="{active: lang === currentLang}"
        >{{lang}}
        </button>
      </div>
    </section>


    <section class="mi-touch" v-if="clmSystemElements['mi-touch']">
      <div class="mi-touch-padding-top"></div>
      <div class="mi-touch-padding-right"></div>
      <div class="mi-touch-padding-bottom"></div>
      <div class="mi-touch-padding-left"></div>
    </section>

  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "development-elements",
    computed: {
      ...mapState(['languages', 'currentLang', 'isActiveDevHelpElements', 'clmSystemElements']),
    },
    methods: {
      ...mapMutations(['SET_LANG']),
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: aqua;
  $mi-touch-padding: 8%;

  .development-elements {
    * {
      z-index: 10001;
    }
  }

  .development-help-elements {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10002;

    border: dashed 1px #999;
    width: 20%;
    height: 10%;
  }

  .mi-touch {
    > * {
      position: absolute;
      background-color: $border-color;

      &:after {
        content: ''+$mi-touch-padding+'';
        position: absolute;
        left: 50%;
        top: 50%;

        padding: 6px;
        transform: translate(-50%, -50%);

        font-family: sans-serif;
        color: #555;

        background-color: #A6DAFA;

      }
    }

    &-padding {
      &-top, &-bottom {
        left: 0;
        height: 1px;
        width: 100%;
      }

      &-left, &-right {
        top: 0;
        height: 100%;
        width: 1px;
      }

      &-top {
        top: $mi-touch-padding;
      }

      &-bottom {
        bottom: $mi-touch-padding;
      }

      &-left {
        left: $mi-touch-padding;
      }

      &-right {
        right: $mi-touch-padding;
      }
    }

  }
</style>
