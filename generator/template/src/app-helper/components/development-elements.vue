<template>
  <div id="development-elements" v-if="isActiveThisPage">

    <section class="development-helpers" v-if="isActiveDevHelpers" :class="{active: isActiveDevBar}">

      <div class="nav">
        <div class="nav-dev-page" @click="devNavigate('dev-page')"></div>
        <div class="nav-prev" :class="{disabled: !adjacentSlides.prev}"
             @click="devNavigate('prev')"></div>
        <div class="nav-next" :class="{disabled: !adjacentSlides.next}"
             @click="devNavigate('next')"></div>
      </div>

      <div class="languages" v-if="languages.length > 1">
        <div v-for="lang in languages" :key="lang"
             :class="{active: lang === currentLang}"
             :id="`lang-${lang}`"
             @click="changeLang(lang)"
        >{{lang}}
        </div>
      </div>

      <div class="toggle-btn" @click="toggleDevBar"></div>
    </section>


    <section class="mi-touch" v-if="clmSystemElements['mi-touch']">
      <div class="mi-touch-padding-top"></div>
      <div class="mi-touch-padding-right"></div>
      <div class="mi-touch-padding-bottom"></div>
      <div class="mi-touch-padding-left"></div>
    </section>

    <section class="veeva" v-if="clmSystemElements['veeva']">
      <div class="veeva-item-1"></div>
      <div class="veeva-item-2"></div>
      <div class="veeva-item-3"></div>
    </section>

    <section class="pharma-touch" v-if="clmSystemElements['pharma-touch']">
      <h1>Lozaaappp!!!</h1>
    </section>

  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { structure } from '@/clm.config'

  const isDev = process.env.NODE_ENV === 'development';

  export default {
    name: "development-elements",
    data() {
      return {
        isActiveDevBar: false,
      }
    },
    computed: {
      ...mapState(['languages', 'currentLang']),
      ...mapState('dev', ['isActiveDevHelpers', 'clmSystemElements']),

      isActiveThisPage() {
        return isDev && this.isActiveDevHelpers || Object.keys(this.clmSystemElements).some(key => !!this.clmSystemElements[key])
      },

      adjacentSlides() {
        const result = {};

        structure.forEach((sl, key) => {
          if (sl.id === this.$route.path.replace(/\//, '')) {
            result.next = (structure[key + 1] && structure[key + 1].id);
            result.prev = (structure[key - 1] && structure[key - 1].id);
          }
        });

        return result
      },
    },
    methods: {
      ...mapMutations(['SET_LANG']),

      toggleDevBar() {
        this.isActiveDevBar = !this.isActiveDevBar
      },

      devNavigate(btn) {
        switch (btn) {
          case 'dev-page':
            this.toggleDevBar();
            this.$router.push('/');
            break;
          case 'next':
            this.$navigateTo(this.adjacentSlides.next);
            break;
          case 'prev':
            this.$navigateTo(this.adjacentSlides.prev);
            break;
        }
      },

      changeLang(lang) {
        this.SET_LANG(lang);
        window.location.reload();
      },
    },
  }
</script>

<style lang="scss" scoped>

  $color-dev-accent-1: #259090;
  $color-dev-accent-2: #2c3e50;
  $color-dev-accent-3: #fafafa;
  $color-dev-red: #ff4242;

  * {
    box-sizing: border-box;
    z-index: 10001;
    font: 400 calc(100vh / 1920 * 50)/1.33 "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }

  /* Dev Elements */
  .development-helpers {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 10002;
    padding: .5em 1em;

    transform: translate(-50%, -100%);
    transition: transform .35s cubic-bezier(0.49, -0.32, 0.45, 1.28);
    background-color: rgba($color-dev-accent-1, .3);

    display: flex;
    align-items: center;

    .nav {
      position: relative;
      display: flex;

      .disabled {
        pointer-events: none !important;
        opacity: .3 !important;
      }

      > * {
        width: 1.5em;
        height: 1.5em;

        margin: 0 .25em;

        &:active {
          opacity: .7;
        }
      }

      &-dev-page {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MTMgNDEzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MTMgNDEzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzJDM0U1MDt9PC9zdHlsZT48Zz48Zz48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzkzLDI4LjNIMjBjLTExLDAtMjAsOS0yMCwyMHYyMzRjMCwxMSw5LDIwLDIwLDIwaDEzOS41djQ1LjNoLTU0LjNjLTEwLjIsMC0xOC41LDguMy0xOC41LDE4LjVzOC4zLDE4LjUsMTguNSwxOC41aDIwMi42YzEwLjIsMCwxOC41LTguMywxOC41LTE4LjVzLTguMy0xOC41LTE4LjUtMTguNWgtNTQuM3YtNDUuM0gzOTNjMTEsMCwyMC05LDIwLTIwdi0yMzRDNDEzLDM3LjMsNDA0LDI4LjMsMzkzLDI4LjN6IE0zODMsMjcyLjNIMzB2LTIxNGgzNTNWMjcyLjN6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTk0LjYsMTc2LjZsNjMuMSwyOS4zYzEuNiwwLjgsMy40LDEuMSw1LjIsMS4xYzIuMywwLDQuNi0wLjcsNi42LTEuOWMzLjUtMi4zLDUuNy02LjEsNS43LTEwLjN2LTAuM2MwLTQuOC0yLjgtOS4xLTcuMS0xMS4xbC0zOS41LTE4LjNsMzkuNS0xOC4zYzQuMy0yLDcuMS02LjQsNy4xLTExLjF2LTAuM2MwLTQuMi0yLjEtOC4xLTUuNy0xMC4zYy0yLTEuMy00LjItMS45LTYuNi0xLjljLTEuOCwwLTMuNiwwLjQtNS4yLDEuMWwtNjMuMSwyOS4zYy00LjMsMi03LjEsNi40LTcuMSwxMS4xdjAuOUM4Ny41LDE3MC4zLDkwLjMsMTc0LjYsOTQuNiwxNzYuNnoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTc1LjcsMjM2LjRjMi4zLDMuMSw2LDUsOS45LDVoMC4zYzUuNCwwLDEwLTMuNCwxMS43LTguNWw0MS42LTEyOC44YzEuMi0zLjcsMC41LTcuOC0xLjgtMTFjLTIuMy0zLjEtNi01LTkuOS01aC0wLjNjLTUuNCwwLTEwLDMuNC0xMS43LDguNWwtNDEuNiwxMjguOEMxNzIuNywyMjkuMSwxNzMuNCwyMzMuMiwxNzUuNywyMzYuNHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjM3LjksMTM1LjZjMCw0LjcsMi44LDkuMSw3LjEsMTEuMWwzOS41LDE4LjNMMjQ1LDE4My40Yy00LjMsMi03LjEsNi40LTcuMSwxMS4xdjAuM2MwLDQuMiwyLjEsOC4xLDUuNywxMC4zYzIsMS4zLDQuMywxLjksNi42LDEuOWMxLjgsMCwzLjUtMC40LDUuMi0xLjFsNjMuMS0yOS4zYzQuMy0yLDcuMS02LjQsNy4xLTExLjF2LTAuOWMwLTQuNy0yLjgtOS4xLTcuMS0xMS4xbC02My4xLTI5LjNjLTEuNi0wLjctMy40LTEuMS01LjItMS4xYy0yLjQsMC00LjYsMC43LTYuNiwxLjljLTMuNiwyLjMtNS43LDYuMS01LjcsMTAuM1YxMzUuNkwyMzcuOSwxMzUuNnoiLz48L2c+PC9nPjwvZz48L3N2Zz4=);
        margin-right: .7em;
      }

      &-prev, &-next {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI2IDI2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzJDM0U1MDt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNywyMi43bDktOWMwLjItMC4yLDAuMy0wLjUsMC4zLTAuN2MwLTAuMy0wLjEtMC41LTAuMy0wLjdsLTktOUMxNi41LDMuMSwxNi4zLDMsMTYsM3MtMC41LDAuMS0wLjcsMC4zbC0xLjQsMS40Yy0wLjQsMC40LTAuNCwxLDAsMS40bDQsNGMwLjMsMC4zLDAuMSwwLjktMC40LDAuOUgxYy0wLjYsMC0xLDAuNC0xLDF2MmMwLDAuNiwwLjQsMSwxLDFoMTYuNmMwLjQsMCwwLjcsMC41LDAuNCwwLjlsLTQsNGMtMC40LDAuNC0wLjQsMSwwLDEuNGwxLjQsMS40YzAuMiwwLjIsMC40LDAuMywwLjcsMC4zQzE2LjMsMjMsMTYuNSwyMi45LDE2LjcsMjIuN3oiLz48L3N2Zz4=);
      }

      &-prev {
        transform: rotate(180deg);
      }
    }

    .languages {
      position: relative;
      display: flex;
      margin-left: .7em;

      > * {
        font-size: .7em;
        font-weight: normal;
        letter-spacing: .1em;
        font-variant: small-caps;
        color: $color-dev-accent-3;

        padding: .5em;
        margin: 0 .25em;
        background-color: $color-dev-accent-1;
        border-bottom: solid .25em transparent;

        &.active {
          border-color: $color-dev-accent-2;
        }

        &:active {
          background-color: rgba($color-dev-accent-1, .7);
        }
      }
    }

    .toggle-btn {
      content: '';
      position: absolute;
      top: 99%;
      left: 50%;
      display: block;
      transform: translateX(-50%);

      width: 2em;
      height: 1.25em;

      background: inherit;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGc+Cgk8cGF0aCBkPSJNMjg2LjkzNSw2OS4zNzdjLTMuNjE0LTMuNjE3LTcuODk4LTUuNDI0LTEyLjg0OC01LjQyNEgxOC4yNzRjLTQuOTUyLDAtOS4yMzMsMS44MDctMTIuODUsNS40MjQgICBDMS44MDcsNzIuOTk4LDAsNzcuMjc5LDAsODIuMjI4YzAsNC45NDgsMS44MDcsOS4yMjksNS40MjQsMTIuODQ3bDEyNy45MDcsMTI3LjkwN2MzLjYyMSwzLjYxNyw3LjkwMiw1LjQyOCwxMi44NSw1LjQyOCAgIHM5LjIzMy0xLjgxMSwxMi44NDctNS40MjhMMjg2LjkzNSw5NS4wNzRjMy42MTMtMy42MTcsNS40MjctNy44OTgsNS40MjctMTIuODQ3QzI5Mi4zNjIsNzcuMjc5LDI5MC41NDgsNzIuOTk4LDI4Ni45MzUsNjkuMzc3eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojMkMzRTUwIiBkYXRhLW9sZF9jb2xvcj0iIzJjM2U1MCI+PC9wYXRoPgo8L2c+PC9nPiA8L3N2Zz4=);
      background-size: 60%;
      background-position: center 0;
      background-repeat: no-repeat;

      border-radius: 0 0 1em 1em;

      /*transition: transform .35s;*/
    }

    &.active {
      transform: translate(-50%, 0%);

      .toggle-btn {
        transform: translateX(-50%) scaleY(-1);
        border-radius: 1em 1em 0 0;
        background-position: center 0.1em;
      }
    }
  }

  /* CLM system elements */
  $border-color: aqua;
  $mi-touch-padding: 8%;

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
        font-size: .5em;
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

  .veeva {
    > * {
      opacity: 0.9;
      background-size: contain;
      background-repeat: no-repeat;
    }
    &-item-1 {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10003;

      width: 15.63%;
      height: 4.82%;

      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABKCAIAAABFHhovAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJEOEY2MjE2NkEyMzExRTg5Q0I2OEZERjBGQUZBRTQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJEOEY2MjE3NkEyMzExRTg5Q0I2OEZERjBGQUZBRTQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkQ4RjYyMTQ2QTIzMTFFODlDQjY4RkRGMEZBRkFFNDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkQ4RjYyMTU2QTIzMTFFODlDQjY4RkRGMEZBRkFFNDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7PammaAAAFuklEQVR42uyd21IqSRBFFRAEWrko6P9/Gi8iiApyEaVl9lAzHQwcgaHp6qJrrQfjhBHCIcldO7NufdnpdC4A4DzJEQIABAwACBgAEDAAAgYABAwACBgAEDAAAgYABAwACBgAAQMAAgYABAwACBgg6xQy8BlKpVKr1ZpMJsPh8Ofnhy/1tLFtNpvL5bLb7XrykR8fHy8vL19fX+fzOQK28hkKBUU8CIJyufz29jabzRBefBTS2xW+ffCrqyv9bLfboxUavBCwJfL5/P39vaz4/f0dK45DsViU8ZpU9hYNXrIEWfHX1xc9sD2q1aqqoEqlgg6P4+bmRv7juXojN1YoFBAc2LYV393dafiUFYdhSCIe3ozIeNX3Eor1VqJerxsrXiwWOLA9ZMKyYhkyWXgIQRAoXKj3jygsCo5C5KMDqwKJU48tl8ujp5dzuZwsxUxuYcU7CpZGo6EoEYrdVmyiJCt2J5dsCFgVSMxXmEwmv00kKKxS6e4/V9A1gqqc1uuQiNt1ivJybwzBcH19LSuWH0ynU3rg/ShM4/F4Q73FYlGCLK5Q23a4FStZFXoHO5l02qdcTtJltu+IuJkZFuVS6osdBZelOxqNvr+/I6fV4Kds08+j7UJ/+/DwoJf9+PjASTSiqXhGkEdXLnIRldOfn58I+D9ItCp3o7jIY4MgqFarJynz9CIq6ZW+3lqxhsJareby0sgZzR20Wi2ZwXA4TGu/h3MCVsEs9ZpwSLq3t7dJTCObTkZx982K1XSo/Duw74BD0FCocnowGKSy38OhL1KilSuaeSazj0+h0T+SMyKzvqc3jQr1bBuv4invRXKnV1GhoNbM+IFlK865o96XlxejXrmEwiEBJ6feCLUx7XY78xlmdhSh3kRReO3vYEvTgdXlRtY3m83M4Y9KpdJsNi1Id71oz3yNp9yyGVJvMd5jszVLU8DT6XRjYTYIgkajYe0/sFgsVD+nO4uYdGmneKrhR1o2WxWbs6QO9cBmR4G1t0t38tAC1WpVmcQOjVQwC5YW9g65ImCzjd7Oe6lu1+h4Fse1j5zYYIeGG9+CUtpYcXL7PVwRsLW+9yxOacehXC5LvezQcKeuLJVKyd0zUXAk53YfgtEA9r0iDMOffzG/v1jNJB+y3Vp/7vjh7PhDfq1Wc/DEjOeYeybG43ESVz45IeDfdgVJcmohVOvuVt0hE/eprNFZhlP4LqOBVU5z8qvF0hewut9t+1W9Ib2dpE2V+FXAZNh4wWfSF/DGMdQTLu2Yg8TRipzeSKOgfpNVMfd6PUpoZzEldAYFvF71yXjVpp6kT5BK9VJmo4g5wGD2VO8tyM8Xxc2MfUxiOUUYhlmexIoErE84GAzit6kbxuvbgXWzp41lJEeYTqcZX0Yy0pIrnkS9yt3o8jG5kIzXwzxWuiiYsmI2cqT7LXixkcMs/0p1MdXrufFuYybw2UqZCho9fdlKKelKw3EO9KlKkVBVOq7HC/O5WM0I9vt9DjPYZMNIsi/g+BPOCtl2vMjXCAVHQW42m8VikWgkyvrUqaUOlKD7gFKq1+slsYwBEQqvgmz5cgiuVvGotBuNRrJirtRJolXx8UqdfD6fXFFHCf1bjdftdrnU7rQdiqeX2tVWkAH2rdhc+sm1sjEJwzD1a2XpgT1FaScrduTxAueIQqcApn6dC72Qv5j9HrPZjEer/N+48WgVcMhJ5vO5uTuCaOxF451TD8pDwPB3L9fv94MgqNfrTP7tnjtw7Q5TBAz/oNQ0M1s8Inib9T32CBgcRQna6/XYerlhvC4/gqdgJy3c2TnAs0X3Yu5CkRVzQY/796jZ0NXT0xOqOC+Uss/Pz7crvA3CWVxgSgkNu0pH0xVn+zLAbddV+yDjPYubwy87nQ7JCnCmsHwPgIABAAEDAAIGQMAAgIABAAEDAAIGQMAAgIABAAEDIGAAQMAAgIABAAEDZJ6/BBgA13BTEpxl+/QAAAAASUVORK5CYII=
      );
    }
    &-item-2 {
      position: absolute;
      top: 0;
      left: 0;

      width: 5.85%;
      height: 22.92%;

      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAFgCAIAAAD/9CrHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM2RTQ0NkMxNkEyMzExRThBMTg0RkFFNzlCQ0MyMzAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM2RTQ0NkMyNkEyMzExRThBMTg0RkFFNzlCQ0MyMzAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzZFNDQ2QkY2QTIzMTFFOEExODRGQUU3OUJDQzIzMDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzZFNDQ2QzA2QTIzMTFFOEExODRGQUU3OUJDQzIzMDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72oQaqAAAEcElEQVR42uzdTUticRTA4SmmgtxkREK1yVy0qlV97D5Iq3QTgeSmYorANgYW6BwcCHqZXvV0bz6/5UyexZN4/9cunJmDg4NfmnyzCECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFuhv73eh3wWzs6ujqtVqpVKZm5uLf7y/v+/1et1u92rUYDAA/fnCtNFobG5uLiwsPPmvhVHLy8tbW1v9fr/T6bTb7dAH/eE2NjZ2dnaeEz8vfmZ7ezt+H61W6+zsDPR7m5mZ2d3dDbgPvSq49/b2VlZWms3mcDh0MXxbeX9//6PKD8UL4+UxBPQbxcfF2traVybEy2MI6NdaX1+v1+tfnxNDYhTo/54x4qN5XNNi1L+DIOinxUnuPWeM918bYyDoF+5KPn0BfOXCGGNBPypu/Mb4dn54U8dY0I+q1WolGlti6KWlpRKNLTF0pVIp0dgSQ0/oKFa0E57vo6cGekLfcBbti9Pvh+71eiUaW2Lom5ubEo0tMfTl5WWJxpYY+urq6u7ubrwz+/1+jAX9qMFgcHp6Ot6ZnU6naH+0LcTxrt1ux3twjG/nGOh49/JRrNlsjmtaq9Uq4B/Fi3LDcn5+PpYPkBhSzD+HF+jOMN6JFxcXX5kQL48h7gzfaDgcHh4exnXs0xfAeHlhHzco1nMdwXR0dHR9ff3OB2gern4eoPlMQRa3G41Go16vz8/Pv/KTcQCPD2WPhH3pHHJ8fHxycrK6ulqr1arV6uLi4sNDjre3t91uN34ZHnIc273Mn1G/yp/vo0GDFmjQoBGABi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUa9NRmV9Z0Q9uVlZFdWRPPrqwkZbuyMrIrKyO7spLOGHZlZWRXVtJdiV1ZGdmVlZRdWUnZlZWUXVl5Z7sSjf0Jd4Y/O7uypgbarqyk7MpKyq6spOzKSsqurLzsyso74dmVlZRdWXnZlZWUXVmp1nZl5WVXVuo5xK6s1HsZu7IEGjRogQYt0KBBCzRogQYNWqBBCzRo0AINWqBBgxZo0AINGrRAgxZo0KAFGrRAgwYt0KAFGjRogQYt0KBBC3TJszhyuqEtjszI4siJZ3FkkrLFkRlZHJmRxZFJZwyLIzOyODLprsTiyIwsjkzK4sikLI5MyuLIvLNdicb+hDvDn53FkVMDbXFkUhZHJmVxZFIWRyZlcWReFkfmnfAsjkzK4si8LI5MyuLIVGuLI/OyODL1HGJxZOq9jMWRAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGD1uT6K8AACzmwSWETDCcAAAAASUVORK5CYII=);
    }
    &-item-3 {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 4.98%;
      height: 7.81%;

      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAB4CAIAAACPYRDeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMzJENkU2NkEyMzExRTg5QzRFOTE2OTNBQzM5NTYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMzJENkU3NkEyMzExRTg5QzRFOTE2OTNBQzM5NTYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UzMkQ2RTQ2QTIzMTFFODlDNEU5MTY5M0FDMzk1NjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UzMkQ2RTU2QTIzMTFFODlDNEU5MTY5M0FDMzk1NjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5MlHYFAAACPklEQVR42uzbS47CMBREURI+4Q9hzP4XxpQNwKxrgGiEIATbz34itwYIjKOkj8C4QF2dTqcR+SY1BJBBBhlkkBHIIIMMMsgIZJBBBhlkBDLIIIMMMsgIZJBBBhlkBDLIIIMMMgIZZJBBBhmBDDLIIIMMsuLZbrfH41G3kPXKfD7f7XZVVelW9yH7dAV1fTgc7g91XyOQdWW/34/H4/tD3dcIZG+zXC5Xq9XToEY0DtmL6AXVtu3LpzT++NKD7N/l3bKl8XeawyVbr9eLxaJjgp7VHMhumUwmfdZ4zdFMyG47Ce3CPk7TnMf9x3DJNptN0zQ9J2um5g+abDabfbvt0nwdNVCy4DdazzfyD5KpQk6n04ADdZSOHRyZ+nbMqqRjnTT2TGRP3Tv4c9ZDY890BU/dO7hgeWjsOchedu+weGjs5mQd3Tu4mZZt7OZkHd07eFks29htyT5277CUbeyGZD27d/DnSanGbkhmumUv2NityL7q3mEp1dhNyNSi8/QbnSV/Y6+N3jJ5WnTOcxmSBXfvsOhcmX9jT0xWZH0RmfW6aUWWpHv7b+wpT1Nwr2S6B7QiS9i9nTf2NGTJu7fnxl6nulYXX/5laewJ/k6j7u22sceS5Vx3nXwKxZK5+rksT2OPIsvQvR3uqKPI/Py2mPPaosiu16tbssvlYrVtjjn4fD6Phhf+VQIyyCCDDDICGWSQQQYZgQwyyCCDjEAGGWSQQQYZgQwyyCCDjEAGGWSQQUYggwwyyCAjt/wJMACiAB4pE2W/1AAAAABJRU5ErkJggg==);
    }
  }

  .pharma-touch {
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
      padding: 2em;
      font-size: 2rem;
      animation: drug_colors .5s steps(1) infinite;

      &:hover {
        opacity: 1;
        background-position: center;
        background-size: contain;
        background-image: url(http://www.inchkiev.ua/images/inchlogo.png);
      }
    }

    @keyframes drug_colors {
      0% {
        background-color: fuchsia;
      }
      25% {
        background-color: aqua;
      }
      50% {
        background-color: chartreuse;
      }
      75% {
        background-color: purple;
      }
      100% {
        background-color: orange;
      }
    }

  }
</style>
