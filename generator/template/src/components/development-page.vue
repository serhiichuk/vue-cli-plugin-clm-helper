<template>
  <section id="development-page">
    <!-- Header -->
    <header>
      <h1 class="dev-title">Development Page</h1>
    </header>

    <!-- Slides -->
    <section class="slides">
      <div class="slides-legend">
        <i class="col col-1">#</i>
        <b class="col col-2">ID</b>
        <b class="col col-3">Name</b>
      </div>

      <div class="slides-list">
        <router-link class="slide" v-for="(slide, n) in slides" :to="`/${slide.id}`" :key="n">
          <i class="col col-1">{{n + 1}}</i>
          <b class="col col-2">{{slide.id}}</b>
          <span class="col col-3">{{slide.name}}</span>
        </router-link>
      </div>
    </section>

    <!-- Right Sidebar -->
    <aside class="sidebar">
      <p class="sidebar-tablet-alert" v-if="!isFullFunctional">Some Functions disabled on tablet or mobile.</p>

      <section v-if="isFullFunctional">
        <div class="description">Show external QR-code link</div>
        <div class="btn icon-external-data-open"
             :class="{active: activeModal === 'external-data-link'}"
             @click="openModal('external-data-link')"
        ></div>
      </section>

      <section class="sidebar-languages">
        <div class="description">Project languages</div>
        <div class="btn" v-for="lang in languages" :key="lang"
             :class="{active: lang === currentLang}"
             @click="SET_LANG(lang)"
        >{{lang}}
        </div>
      </section>

      <section class="sidebar-dev-help-el">
        <div class="description">CLM System Elements</div>
        <div class="btn" :class="{active: isActiveDevHelpers}"
             @click="TOGGLE_DEV_HELPERS"
        >{{isActiveDevHelpers ? 'on' : 'off'}}
        </div>
      </section>

      <section class="sidebar-clm-system-el">
        <div class="description">CLM System Elements</div>
        <div class="btn" v-for="(value, key) in clmSystemElements" :key="key"
             :class="{active: value}"
             @click="SET_CLM_SYSTEM_ELEMENTS({[key]: !value})"
        >{{key}}
        </div>
      </section>

    </aside>


    <!-- Footer -->
    <footer>
      <h5>Created by <b>Taras Serhiichuk</b></h5>
    </footer>

    <!-- Modal Sections -->
    <section class="modal external-data"
             :class="{active: activeModal === 'external-data-link'}">
      <div class="btn-close" @click="closeModal"></div>

      <div class="external-data-qr-code" v-html="externalData.qr"></div>

      <div class="external-data-link" @mouseleave="resetTooltip">
        <input id="external-link" v-model="externalData.link"/>
        <div class="btn icon-external-data-copy" @click="copyTextToClipboard">
          <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
        </div>
      </div>

      <div class="external-data-description">Use these addresses to load live preview on other devices.</div>
    </section>

    <!-- Preloader -->
    <transition name="fade">
      <div class="preloader" v-if="!ready">
        <div class="loader">
          <div class="spin"></div>
          <div class="bounce"></div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import qrcode from 'qrcode-generator'
  import {languages, structure} from '@/clm.config'
  import {getLocalIP} from '@/app/utils/get-system-info'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'development-page',
    data() {
      return {
        ready: false,
        languages,
        activeModal: '',
        externalData: {
          qr: '',
          link: ''
        }
      }
    },

    computed: {
      ...mapState(['currentLang', 'isActiveDevHelpers', 'clmSystemElements']),

      slides() {
        return structure.map(sl => {
          return {
            ...sl,
            name: sl.name[this.currentLang] || sl.name
          }
        })
      },

      isFullFunctional() {
        return !!this.externalData.link
      }
    },

    methods: {
      ...mapMutations(['SET_LANG', 'TOGGLE_DEV_HELPERS', 'SET_CLM_SYSTEM_ELEMENTS']),

      copyTextToClipboard() {
        const copyText = document.getElementById('external-link');
        const tooltip = document.getElementById("myTooltip");

        copyText.select();
        document.execCommand("Copy");
        tooltip.innerHTML = "Copied: " + copyText.value;
      },

      resetTooltip() {
        const tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Copy to clipboard";
      },

      closeModal() {
        this.activeModal = ''
      },

      openModal(name) {
        this.activeModal = name
      },
    },

    created() {
      getLocalIP().then(ip => {
        const port = /\:\d{4,6}/.exec(window.location.href); //=> :8080
        const externalHref = `http://${ip}${port}`;
        const typeNumber = 0;
        const errorCorrectionLevel = 'L';
        const qr = qrcode(typeNumber, errorCorrectionLevel);

        qr.addData(externalHref);
        qr.make();
        this.externalData.qr = qr.createSvgTag(20);
        this.externalData.link = externalHref;
      });
    },

    mounted() {
      document.querySelectorAll('#app > *').forEach(appChildEl => {
        if (!/development-|dev-/.test(appChildEl.getAttribute('id'))) {
          appChildEl.style.display = 'none';
        }
      });

      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        this.ready = true;
      })
    }
  }
</script>

<style lang="scss" scoped>
  $top: 1.5em;
  $bottom: 1em;
  $slide-list-width: 70%;
  $modal-width: 70%;
  $modal-height: 70%;

  $color-dev-accent-1: #259090;
  $color-dev-accent-2: #2c3e50;
  $color-dev-accent-3: #fafafa;
  $color-dev-red: #ff4242;

  * {
    box-sizing: border-box;
  }

  #development-page {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;

    width: 100%;
    height: 100%;

    color: $color-dev-accent-2;

    font: 400 calc(100vw / 1920 * 40)/1.33 "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;

    -webkit-text-size-adjust: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .btn {
    width: 2.5em;
    height: 2.5em;

    border-radius: .2em;
    cursor: pointer;

    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: inset 0 0 5em -2em $color-dev-accent-2;

    font-variant: small-caps;
    text-align: center;

    @include flexCentered;

    &.active {
      box-shadow: inset 0 0 6em -1em $color-dev-accent-1;
    }

    &:active, &:hover {
      opacity: .8;
    }
  }

  .btn-close {
    position: absolute;
    right: .75em;
    top: .75em;

    width: 1.8em;
    height: 1.8em;

    border-radius: .2em;
    background-color: $color-dev-red;

    &:before, &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: - 2.5%;
      margin-top: -25%;
      transform-origin: center;

      width: 5%;
      height: 50%;

      background-color: #fff;
    }

    &:before {
      transform: rotate(-45deg);
    }

    &:after {
      transform: rotate(45deg);
    }

    &:active {
      box-shadow: inset 0 0 5em -1em darken($color-dev-red, 50%);
    }

    &:hover {
      box-shadow: inset 0 0 5em -1em lighten($color-dev-red, 10%);
    }
  }

  header, footer {
    position: absolute;
    left: 0;
    width: 100%;

    display: flex;
    align-items: center;

    padding: 0 1em;
  }

  header {
    top: 0;
    height: $top;

    background-color: $color-dev-accent-1;
    color: $color-dev-accent-3;

    .dev-title {
      font-size: 1em;
    }
  }

  footer {
    bottom: 0;
    height: $bottom;

    background-color: $color-dev-accent-2;
    font-weight: 300;
    color: $color-dev-accent-3;

    justify-content: flex-end;

    > h5 {
      font-size: .75em;
    }
  }

  .slides {
    position: absolute;
    top: $top;
    left: 0;
    bottom: $bottom;
    width: $slide-list-width;
    overflow-y: scroll;

    border-right: solid 1px $color-dev-accent-2;
    border-left: solid 1px $color-dev-accent-2;

    display: flex;
    flex-flow: column;

    .col {
      display: inline-block;
      padding-right: 1em;
      font-size: .85em;

      &-1 {
        width: 5%;
        text-align: right;
      }

      &-2 {
        width: 20%;
      }

      &-3 {
        font-weight: 300;
      }
    }

    &-legend {
      padding-left: .5em;
      background-color: $color-dev-accent-3;
    }

    &-list {
      padding-left: .5em;

      > * {
        text-decoration: none;
        color: inherit;

        display: flex;
        border-bottom: 1px solid rgba($color-dev-accent-1, .05);

        &:hover {
          background-color: darken($color-dev-accent-3, .2);
        }
      }
    }

    // Scroll bar Styles
    &::-webkit-scrollbar {
      width: .15rem;

      &-track {
        background: $color-dev-accent-3;
      }

      &-thumb {
        background: rgba($color-dev-accent-2, .5);

        &:hover {
          background: rgba($color-dev-accent-2, .8);
        }
      }
    }
  }

  .sidebar {
    position: absolute;
    top: $top;
    right: 0;
    bottom: $bottom;

    width: 100 - $slide-list-width;
    padding: .75em;

    background-color: rgba($color-dev-accent-2, .1);

    &-tablet-alert {
      text-align: center;
      margin-bottom: 1em;
    }

    > section {
      padding: 0 1em;
      padding-bottom: .5em;
      margin-bottom: .5em;

      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: solid 1px $color-dev-accent-2;

      .description {
        width: 50%;
        font-size: .75em;
        font-weight: 300;
        color: $color-dev-accent-2;
      }
    }

    &-languages {
      .btn {
      }
    }

    &-dev-help-el {
      .btn {
        /*flex-basis: 30%;*/

        /*font-size: .7em;*/
        /*line-height: 1em;*/
        /*font-variant: small-caps;*/
        /*text-align: center;*/
      }
    }

    &-clm-system-el {
      flex-wrap: wrap;

      .description {
        flex-basis: 100%;
        margin-bottom: .5em;
      }

      .btn {
        flex-basis: 30%;

        font-size: .7em;
        line-height: 1em;
      }
    }
  }

  .modal {
    @include transformCentered;
    width: $modal-width;
    height: $modal-height;

    background-color: $color-dev-accent-3;
    box-shadow: 0 0 5em -3em $color-dev-accent-2;
    border-bottom: .05em solid $color-dev-accent-2;
    border-left: .25em solid $color-dev-accent-2;

    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%) scale(.8);

    transition: all .3s, box-shadow .4s .2s;

    &.active {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 8em -3em $color-dev-accent-2;
    }
  }

  .icon-external-data-open {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48Zz4KCTxwYXRoIGQ9Ik0xOTIuMTQ2LDM0Ny44MDVjLTE3LjA1Myw3LjQ3MS0zNi4wMDIsNy44ODEtNTMuMzQ0LDEuMDk4Yy0xMy41MjctNS4yNjItMjQuNjgtMTQuNDU1LTMyLjUzMy0yNi4yNzdsMzAuOTYzLDMuMjA5ICAgYzIuMjEzLDAuMjM2LDQuMjY2LTEuMDc2LDQuOTcxLTMuMTM3YzAuNzY4LTIuMDU4LTAuMDMxLTQuMzk2LTEuODkzLTUuNTdsLTU4LjM0Mi0zNy44NGMtMi45NDktMS45MDYtNi42MDUtMi4xODMtOS43NDItMC44MTcgICBjLTMuMTc4LDEuNDE5LTUuNDE4LDQuMzAyLTYuMDI5LDcuNjk4bC0xMS43MzIsNjguNjExYy0wLjM4NSwyLjEzOCwwLjgwMyw0LjI5MywyLjgyLDUuMTQ2YzIuMDUzLDAuODc5LDQuMzkxLDAuMjM3LDUuNzA5LTEuNTA4ICAgbDIwLjE2Mi0yNy4wOGMxMC42NzYsMTguMjcxLDI2LjcwMSwzMi41ODcsNDYuNzAzLDQwLjM5N2MxMS4xMjUsNC4zNDcsMjIuNzI5LDYuNTAyLDM0LjMwMSw2LjUwMiAgIGMxMi44ODksMCwyNS43MTEtMi42NjksMzcuODU3LTcuOTk4YzYuMTg2LTIuNzI3LDkuMDEyLTkuOTU3LDYuMjg1LTE2LjE0MkMyMDUuNjExLDM0Ny44OTUsMTk4LjM5OCwzNDUuMDUyLDE5Mi4xNDYsMzQ3LjgwNXoiIHN0eWxlPSJmaWxsOiMyQzNFNTAiIGRhdGEtb3JpZ2luYWw9IiMyQzNFNTAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiByZ2IoNDQsIDYyLCA4MCkiPjwvcGF0aD4KCTxwYXRoIGQ9Ik0yMDIuMDE4LDEyMS40NjhjMTcuMDU5LTcuNDg0LDM2LjAwMi03Ljg3Nyw1My4zNzUtMS4xMDdjMTMuNDk2LDUuMjc1LDI0LjY4NiwxNC40NjYsMzIuNTM1LDI2LjI3OWwtMzAuOTk0LTMuMjA3ICAgYy0yLjE4NC0wLjIzMi00LjI2OCwxLjA4Mi00Ljk3MywzLjE0MmMtMC43NjgsMi4wNTMsMC4wNjgsNC4zOTIsMS44OTMsNS41NTRsNTguMzczLDM3Ljg0OWMyLjkyLDEuOTE1LDYuNTc0LDIuMTkxLDkuNzQ4LDAuODE2ICAgYzMuMTQxLTEuNDEsNS4zODEtNC4zMDIsNS45OTItNy42ODlsMTEuNzM0LTY4LjYwOWMwLjM4My0yLjE0OS0wLjgwNS00LjMwNC0yLjgyMi01LjEzOWMtMi4wMjEtMC44OTctNC4zOTEtMC4yNDgtNS43MDcsMS41ICAgbC0yMC4xNjIsMjcuMDU2Yy0xMC42NzYtMTguMjU3LTI2LjcwMS0zMi41NjktNDYuNzAzLTQwLjM3NWMtMjMuNDY3LTkuMTYtNDkuMDc4LTguNjIyLTcyLjE2LDEuNDkxICAgYy02LjE4NiwyLjcyNC05LjAxLDkuOTU0LTYuMjgzLDE2LjE0QzE4OC41OSwxMjEuMzYzLDE5NS43NywxMjQuMjA4LDIwMi4wMTgsMTIxLjQ2OHoiIHN0eWxlPSJmaWxsOiMyQzNFNTAiIGRhdGEtb3JpZ2luYWw9IiMyQzNFNTAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiByZ2IoNDQsIDYyLCA4MCkiPjwvcGF0aD4KCTxwYXRoIGQ9Ik00NjIuNjAyLDIyMC40ODFIMjY3LjI4N2MtMjEuNzcsMC0zOS40OTYsMTcuNzA4LTM5LjQ5NiwzOS40Njl2MTIzLjY4N2MwLDIxLjc2NSwxNy43MjcsMzkuNDc4LDM5LjQ5NiwzOS40NzhoNTMuMTQ2ICAgbC05LjgwOSwzMS44NzNjLTEuMjUsNC4wNy0wLjQ4Miw4LjQ5MywyLjA1MywxMS45MjVjMi41MzEsMy40MTgsNi41MzksNS40NDksMTAuODAxLDUuNDQ5aDgyLjkzMmM0LjI2MiwwLDguMjctMi4wMzEsMTAuODAxLTUuNDQ5ICAgYzIuNTM1LTMuNDMyLDMuMzAzLTcuODQ2LDIuMDIxLTExLjkyNWwtOS43NzktMzEuODczaDUzLjE0OGMyMS43NjYsMCwzOS40NTktMTcuNzEzLDM5LjQ1OS0zOS40NzhWMjU5Ljk1MSAgIEM1MDIuMDYxLDIzOC4xOSw0ODQuMzY3LDIyMC40ODEsNDYyLjYwMiwyMjAuNDgxeiBNNDY5LjM5OCwzODMuNjM3YzAsMy43NTMtMy4wNDMsNi43OTctNi43OTcsNi43OTdIMjY3LjI4NyAgIGMtMy43NTQsMC02Ljc5Ny0zLjA0My02Ljc5Ny02Ljc5N1YyNTkuOTUxYzAtMy43NTMsMy4wNDMtNi43OTcsNi43OTctNi43OTdoMTk1LjMxNGMzLjc1NCwwLDYuNzk3LDMuMDQzLDYuNzk3LDYuNzk3VjM4My42Mzd6IiBzdHlsZT0iZmlsbDojMkMzRTUwIiBkYXRhLW9yaWdpbmFsPSIjMkMzRTUwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIgcmdiKDQ0LCA2MiwgODApIj48L3BhdGg+Cgk8cGF0aCBkPSJNMTQ2LjkxNiwyMjIuMzI1VjUxLjg5MWMwLTYuNzY0LTUuNDg0LTEyLjI1My0xMi4yNDYtMTIuMjUzSDIyLjIxN2MtNi43OTcsMC0xMi4yNzcsNS40ODktMTIuMjc3LDEyLjI1M3YxNzAuNDM0ICAgYzAsNi43NjEsNS40OCwxMi4yNTUsMTIuMjc3LDEyLjI1NUgxMzQuNjdDMTQxLjQzMiwyMzQuNTgsMTQ2LjkxNiwyMjkuMDg2LDE0Ni45MTYsMjIyLjMyNXogTTc4LjQ0MywyMjMuODM4ICAgYy01Ljk2MywwLTEwLjczOC00LjgxNS0xMC43MzgtMTAuNzM4YzAtNS45MzEsNC43NzUtMTAuNzM3LDEwLjczOC0xMC43MzdjNS45MzIsMCwxMC43MzgsNC44MDYsMTAuNzM4LDEwLjczNyAgIEM4OS4xODIsMjE5LjAyMiw4NC4zNzUsMjIzLjgzOCw3OC40NDMsMjIzLjgzOHogTTEyMi4zOTMsMTkxLjY1NmgtODcuOTNWNjQuMTQzaDg3LjkzVjE5MS42NTZ6IiBzdHlsZT0iZmlsbDojMkMzRTUwIiBkYXRhLW9yaWdpbmFsPSIjMkMzRTUwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIgcmdiKDQ0LCA2MiwgODApIj48L3BhdGg+CjwvZz48L2c+IDwvc3ZnPg==);
  }

  .icon-external-data-copy {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zNjYuOTA1LDEwOC4wMTZoLTE0MS45MWMtMTEuMDQ4LDAtMjAuMDAzLDguOTU1LTIwLjAwMywyMC4wMDNzOC45NTUsMjAuMDAzLDIwLjAwMywyMC4wMDNoMTQxLjkxICAgIGMxMS4wNDgsMCwyMC4wMDMtOC45NTUsMjAuMDAzLTIwLjAwM1MzNzcuOTUyLDEwOC4wMTYsMzY2LjkwNSwxMDguMDE2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMkMzRTUwIiBkYXRhLW9sZF9jb2xvcj0iIzJjM2U1MCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzY2LjkwNSwxODguMDI3aC0xNDEuOTFjLTExLjA0OCwwLTIwLjAwMyw4Ljk1NS0yMC4wMDMsMjAuMDAzczguOTU1LDIwLjAwMywyMC4wMDMsMjAuMDAzaDE0MS45MSAgICBjMTEuMDQ3LDAsMjAuMDAzLTguOTU1LDIwLjAwMy0yMC4wMDNTMzc3Ljk1MywxODguMDI3LDM2Ni45MDUsMTg4LjAyN3oiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzJDM0U1MCIgZGF0YS1vbGRfY29sb3I9IiMyYzNlNTAiPjwvcGF0aD4KCTwvZz4KPC9nPjxnPgoJPGc+CgkJPHBhdGggZD0iTTI4Ni4wMDQsMjY4LjAzOWgtNjEuMDA5Yy0xMS4wNDgsMC0yMC4wMDMsOC45NTUtMjAuMDAzLDIwLjAwM2MwLDExLjA0OCw4Ljk1NSwyMC4wMDMsMjAuMDAzLDIwLjAwM2g2MS4wMDkgICAgYzExLjA0OCwwLDIwLjAwMy04Ljk1NSwyMC4wMDMtMjAuMDAzQzMwNi4wMDcsMjc2Ljk5NCwyOTcuMDUyLDI2OC4wMzksMjg2LjAwNCwyNjguMDM5eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMkMzRTUwIiBkYXRhLW9sZF9jb2xvcj0iIzJjM2U1MCI+PC9wYXRoPgoJPC9nPgo8L2c+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDQ4LjAyOCwyNzIuMDM5YzExLjA0OCwwLDIwLjAwMy04Ljk1NSwyMC4wMDMtMjAuMDAzVjgwLjAxMkM0NjguMDMxLDM1Ljg5Myw0MzIuMTM3LDAsMzg4LjAxOSwwSDIwMy45OTIgICAgYy00NC4wOTQsMC03OS45NzEsMzUuODUzLTgwLjAxMiw3OS45MzhjLTQ0LjExOCwwLTgwLjAxMiwzNS44OTMtODAuMDEyLDgwLjAxMnYyNzIuMDM5YzAsNDQuMTE4LDM1Ljg5Myw4MC4wMTIsODAuMDEyLDgwLjAxMiAgICBoMTk0LjAyOGM0NC4xMTgsMCw4MC4wMTItMzUuODkzLDgwLjAxMi04MC4wMTJ2LTAuNjA4YzM5LjQxNC00LjkzOCw3MC4wMS0zOC42NjIsNzAuMDEtNzkuMzg5ICAgIGMwLTExLjA0OC04Ljk1NS0yMC4wMDMtMjAuMDAzLTIwLjAwM2MtMTEuMDQ4LDAtMjAuMDAzLDguOTU1LTIwLjAwMywyMC4wMDNjMCwyMi4wNTQtMTcuOTQyLDQwLjAwMS0zOS45OTYsNDAuMDA2bC0xODQuMDI3LDAuMDQ1ICAgIGgtMC4wMDljLTEwLjY4NSwwLTIwLjczLTQuMTYtMjguMjg1LTExLjcxNWMtNy41NTgtNy41NTYtMTEuNzIxLTE3LjYwNC0xMS43MjEtMjguMjkxVjgwLjAxMiAgICBjMC0yMi4wNTksMTcuOTQ3LTQwLjAwNiw0MC4wMDYtNDAuMDA2SDM4OC4wMmMyMi4wNTksMCw0MC4wMDYsMTcuOTQ3LDQwLjAwNiw0MC4wMDZ2MTcyLjAyNSAgICBDNDI4LjAyNSwyNjMuMDg0LDQzNi45OCwyNzIuMDM5LDQ0OC4wMjgsMjcyLjAzOXogTTIwMy45OTIsNDMyLjA0N2gwLjAybDE1NC4wMDItMC4wMzggICAgYy0wLjAxMiwyMi4wNDktMTcuOTU0LDM5Ljk4NC00MC4wMDYsMzkuOTg0SDEyMy45ODFjLTIyLjA1OSwwLTQwLjAwNi0xNy45NDctNDAuMDA2LTQwLjAwNlYxNTkuOTQ4ICAgIGMwLTIyLjA1OSwxNy45NDctNDAuMDA2LDQwLjAwNi00MC4wMDZ2MjMyLjA5NGMwLDIxLjM3NSw4LjMyNSw0MS40NzEsMjMuNDQxLDU2LjU4MyAgICBDMTYyLjUzNSw0MjMuNzI5LDE4Mi42MjIsNDMyLjA0NywyMDMuOTkyLDQzMi4wNDd6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMyQzNFNTAiIGRhdGEtb2xkX2NvbG9yPSIjMmMzZTUwIj48L3BhdGg+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==);
  }

  .external-data {
    width: calc(100vh * 0.6);
    height: auto;

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    background-color: #fff;

    &-qr-code {
      width: 85%;

      /deep/ svg {
        margin: 0 auto;
        width: 100%;
        height: auto;
      }
    }

    &-link {
      margin-top: -1em;
      max-width: 90%;

      display: flex;
      align-items: center;
      justify-content: space-around;

      border: 1px solid $color-dev-accent-2;
      border-radius: .5em;

      > input {
        margin: 0 .5em;
        border: none;
        font-size: .85em;
      }

      > div {
        position: relative;
        z-index: 2;
        padding-left: .5em;

        height: 1.8em;
        width: 1.8em;

        border-radius: 0 .4em .4em 0;

        .tooltiptext {
          position: absolute;
          bottom: 115%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;

          width: max-content;
          padding: 0.5em 1em;

          color: #fff;
          text-align: center;
          font-size: .75em;

          background-color: $color-dev-accent-2;
          border-radius: 6px;

          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s;

          &:after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;

            border: 5px solid transparent;
            border-top-color: #555;
          }
        }

        &:hover {
          .tooltiptext {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }

    &-description {
      width: 50%;
      margin: 1em;

      font-size: .65em;
      text-align: center;
    }
  }

  /* Preloader */
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000000;

    width: 100%;
    height: 100%;

    background-color: lighten($color-dev-accent-1, 50%);

    @include flexCentered;

    .loader {
      position: relative;
      height: 5rem;
      width: 10rem;
      box-sizing: content-box;

      * {
        box-sizing: content-box;
      }

      &:before {
        content: '';
        @include transformCentered;

        height: 0;
        width: 0;

        border: 0.2rem solid $color-dev-accent-2;
      }

      .spin {
        position: absolute;
        left: 50%;
        top: 50%;

        margin-left: -1rem;
        margin-top: -1rem;

        width: 2rem;
        height: 2rem;

        animation: spin 2.25s linear infinite;

        &:before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;

          height: inherit;
          width: inherit;

          transform: translate(-50%, -50%) rotate(45deg);
          border: 0.3rem solid $color-dev-accent-2;
        }
      }

      .bounce {
        position: relative;
        height: 100%;
        width: 100%;
        margin: 0 auto;

        animation: bounce 2.25s linear infinite;

        &:after, &:before {
          content: '';
          position: absolute;
          top: 50%;
          height: 1rem;
          width: 1rem;
          margin-top: -0.5rem;

          transform: rotate(45deg);
        }

        &:before {
          left: 0;
          border-bottom: .3rem solid $color-dev-accent-2;
          border-left: .3rem solid $color-dev-accent-2;
        }

        &:after {
          right: 0;
          border-right: .3rem solid $color-dev-accent-2;
          border-top: .3rem solid $color-dev-accent-2;
        }
      }
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(0deg);
    }
    20% {
      transform: rotate(90deg);
    }
    35% {
      transform: rotate(90deg);
    }
    45% {
      transform: rotate(180deg);
    }
    60% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    85% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
