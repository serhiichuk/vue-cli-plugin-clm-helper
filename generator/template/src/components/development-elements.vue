<template>
  <div id="development-elements" v-if="isActiveThisPage">

    <section class="development-helpers" v-if="isActiveDevHelpers">

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

    <section class="veeva" v-if="clmSystemElements['veeva']">
      <div class="veeva-item-1"></div>
      <div class="veeva-item-2"></div>
      <div class="veeva-item-3"></div>
    </section>

  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "development-elements",
    computed: {
      ...mapState(['languages', 'currentLang', 'isActiveDevHelpers', 'clmSystemElements']),
      isActiveThisPage() {
        const {isActiveDevHelpers, clmSystemElements} = this;
        return isActiveDevHelpers || Object.keys(clmSystemElements).some(key => !!clmSystemElements[key])
      }
    },
    methods: {
      ...mapMutations(['SET_LANG']),
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: aqua;
  $mi-touch-padding: 8%;

  #development-elements {
    * {
      z-index: 10001;
    }
  }

  .development-helpers {
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

  .veeva {
    > * {
      opacity: 0.9;
    }
    &-item-1 {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10003;

      width: 320px;
      height: 74px;

      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABKCAIAAABFHhovAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJEOEY2MjE2NkEyMzExRTg5Q0I2OEZERjBGQUZBRTQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJEOEY2MjE3NkEyMzExRTg5Q0I2OEZERjBGQUZBRTQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkQ4RjYyMTQ2QTIzMTFFODlDQjY4RkRGMEZBRkFFNDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkQ4RjYyMTU2QTIzMTFFODlDQjY4RkRGMEZBRkFFNDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7PammaAAAFuklEQVR42uyd21IqSRBFFRAEWrko6P9/Gi8iiApyEaVl9lAzHQwcgaHp6qJrrQfjhBHCIcldO7NufdnpdC4A4DzJEQIABAwACBgAEDAAAgYABAwACBgAEDAAAgYABAwACBgAAQMAAgYABAwACBgg6xQy8BlKpVKr1ZpMJsPh8Ofnhy/1tLFtNpvL5bLb7XrykR8fHy8vL19fX+fzOQK28hkKBUU8CIJyufz29jabzRBefBTS2xW+ffCrqyv9bLfboxUavBCwJfL5/P39vaz4/f0dK45DsViU8ZpU9hYNXrIEWfHX1xc9sD2q1aqqoEqlgg6P4+bmRv7juXojN1YoFBAc2LYV393dafiUFYdhSCIe3ozIeNX3Eor1VqJerxsrXiwWOLA9ZMKyYhkyWXgIQRAoXKj3jygsCo5C5KMDqwKJU48tl8ujp5dzuZwsxUxuYcU7CpZGo6EoEYrdVmyiJCt2J5dsCFgVSMxXmEwmv00kKKxS6e4/V9A1gqqc1uuQiNt1ivJybwzBcH19LSuWH0ynU3rg/ShM4/F4Q73FYlGCLK5Q23a4FStZFXoHO5l02qdcTtJltu+IuJkZFuVS6osdBZelOxqNvr+/I6fV4Kds08+j7UJ/+/DwoJf9+PjASTSiqXhGkEdXLnIRldOfn58I+D9ItCp3o7jIY4MgqFarJynz9CIq6ZW+3lqxhsJareby0sgZzR20Wi2ZwXA4TGu/h3MCVsEs9ZpwSLq3t7dJTCObTkZx982K1XSo/Duw74BD0FCocnowGKSy38OhL1KilSuaeSazj0+h0T+SMyKzvqc3jQr1bBuv4invRXKnV1GhoNbM+IFlK865o96XlxejXrmEwiEBJ6feCLUx7XY78xlmdhSh3kRReO3vYEvTgdXlRtY3m83M4Y9KpdJsNi1Id71oz3yNp9yyGVJvMd5jszVLU8DT6XRjYTYIgkajYe0/sFgsVD+nO4uYdGmneKrhR1o2WxWbs6QO9cBmR4G1t0t38tAC1WpVmcQOjVQwC5YW9g65ImCzjd7Oe6lu1+h4Fse1j5zYYIeGG9+CUtpYcXL7PVwRsLW+9yxOacehXC5LvezQcKeuLJVKyd0zUXAk53YfgtEA9r0iDMOffzG/v1jNJB+y3Vp/7vjh7PhDfq1Wc/DEjOeYeybG43ESVz45IeDfdgVJcmohVOvuVt0hE/eprNFZhlP4LqOBVU5z8qvF0hewut9t+1W9Ib2dpE2V+FXAZNh4wWfSF/DGMdQTLu2Yg8TRipzeSKOgfpNVMfd6PUpoZzEldAYFvF71yXjVpp6kT5BK9VJmo4g5wGD2VO8tyM8Xxc2MfUxiOUUYhlmexIoErE84GAzit6kbxuvbgXWzp41lJEeYTqcZX0Yy0pIrnkS9yt3o8jG5kIzXwzxWuiiYsmI2cqT7LXixkcMs/0p1MdXrufFuYybw2UqZCho9fdlKKelKw3EO9KlKkVBVOq7HC/O5WM0I9vt9DjPYZMNIsi/g+BPOCtl2vMjXCAVHQW42m8VikWgkyvrUqaUOlKD7gFKq1+slsYwBEQqvgmz5cgiuVvGotBuNRrJirtRJolXx8UqdfD6fXFFHCf1bjdftdrnU7rQdiqeX2tVWkAH2rdhc+sm1sjEJwzD1a2XpgT1FaScrduTxAueIQqcApn6dC72Qv5j9HrPZjEer/N+48WgVcMhJ5vO5uTuCaOxF451TD8pDwPB3L9fv94MgqNfrTP7tnjtw7Q5TBAz/oNQ0M1s8Inib9T32CBgcRQna6/XYerlhvC4/gqdgJy3c2TnAs0X3Yu5CkRVzQY/796jZ0NXT0xOqOC+Uss/Pz7crvA3CWVxgSgkNu0pH0xVn+zLAbddV+yDjPYubwy87nQ7JCnCmsHwPgIABAAEDAAIGQMAAgIABAAEDAAIGQMAAgIABAAEDIGAAQMAAgIABAAEDZJ6/BBgA13BTEpxl+/QAAAAASUVORK5CYII=
      );
    }
    &-item-2 {
      position: absolute;
      top: 0;
      left: 0;

      width: 120px;
      height: 352px;

      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAFgCAIAAAD/9CrHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM2RTQ0NkMxNkEyMzExRThBMTg0RkFFNzlCQ0MyMzAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM2RTQ0NkMyNkEyMzExRThBMTg0RkFFNzlCQ0MyMzAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzZFNDQ2QkY2QTIzMTFFOEExODRGQUU3OUJDQzIzMDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzZFNDQ2QzA2QTIzMTFFOEExODRGQUU3OUJDQzIzMDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72oQaqAAAEcElEQVR42uzdTUticRTA4SmmgtxkREK1yVy0qlV97D5Iq3QTgeSmYorANgYW6BwcCHqZXvV0bz6/5UyexZN4/9cunJmDg4NfmnyzCECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFuhv73eh3wWzs6ujqtVqpVKZm5uLf7y/v+/1et1u92rUYDAA/fnCtNFobG5uLiwsPPmvhVHLy8tbW1v9fr/T6bTb7dAH/eE2NjZ2dnaeEz8vfmZ7ezt+H61W6+zsDPR7m5mZ2d3dDbgPvSq49/b2VlZWms3mcDh0MXxbeX9//6PKD8UL4+UxBPQbxcfF2traVybEy2MI6NdaX1+v1+tfnxNDYhTo/54x4qN5XNNi1L+DIOinxUnuPWeM918bYyDoF+5KPn0BfOXCGGNBPypu/Mb4dn54U8dY0I+q1WolGlti6KWlpRKNLTF0pVIp0dgSQ0/oKFa0E57vo6cGekLfcBbti9Pvh+71eiUaW2Lom5ubEo0tMfTl5WWJxpYY+urq6u7ubrwz+/1+jAX9qMFgcHp6Ot6ZnU6naH+0LcTxrt1ux3twjG/nGOh49/JRrNlsjmtaq9Uq4B/Fi3LDcn5+PpYPkBhSzD+HF+jOMN6JFxcXX5kQL48h7gzfaDgcHh4exnXs0xfAeHlhHzco1nMdwXR0dHR9ff3OB2gern4eoPlMQRa3G41Go16vz8/Pv/KTcQCPD2WPhH3pHHJ8fHxycrK6ulqr1arV6uLi4sNDjre3t91uN34ZHnIc273Mn1G/yp/vo0GDFmjQoBGABi3QoEELNGiBBg1aoEELNGjQAg1aoEGDFmjQAg0atECDFmjQoAUatECDBi3QoAUa9NRmV9Z0Q9uVlZFdWRPPrqwkZbuyMrIrKyO7spLOGHZlZWRXVtJdiV1ZGdmVlZRdWUnZlZWUXVl5Z7sSjf0Jd4Y/O7uypgbarqyk7MpKyq6spOzKSsqurLzsyso74dmVlZRdWXnZlZWUXVmp1nZl5WVXVuo5xK6s1HsZu7IEGjRogQYt0KBBCzRogQYNWqBBCzRo0AINWqBBgxZo0AINGrRAgxZo0KAFGrRAgwYt0KAFGjRogQYt0KBBC3TJszhyuqEtjszI4siJZ3FkkrLFkRlZHJmRxZFJZwyLIzOyODLprsTiyIwsjkzK4sikLI5MyuLIvLNdicb+hDvDn53FkVMDbXFkUhZHJmVxZFIWRyZlcWReFkfmnfAsjkzK4si8LI5MyuLIVGuLI/OyODL1HGJxZOq9jMWRAg0atECDFmjQoAUatECDBi3QoAUaNGiBBi3QoEELNGiBBg1aoEELNGjQAg1aoEGD1uT6K8AACzmwSWETDCcAAAAASUVORK5CYII=);
    }
    &-item-3 {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 102px;
      height: 120px;

      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAB4CAIAAACPYRDeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNFMzJENkU2NkEyMzExRTg5QzRFOTE2OTNBQzM5NTYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNFMzJENkU3NkEyMzExRTg5QzRFOTE2OTNBQzM5NTYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0UzMkQ2RTQ2QTIzMTFFODlDNEU5MTY5M0FDMzk1NjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UzMkQ2RTU2QTIzMTFFODlDNEU5MTY5M0FDMzk1NjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5MlHYFAAACPklEQVR42uzbS47CMBREURI+4Q9hzP4XxpQNwKxrgGiEIATbz34itwYIjKOkj8C4QF2dTqcR+SY1BJBBBhlkkBHIIIMMMsgIZJBBBhlkBDLIIIMMMsgIZJBBBhlkBDLIIIMMMgIZZJBBBhmBDDLIIIMMsuLZbrfH41G3kPXKfD7f7XZVVelW9yH7dAV1fTgc7g91XyOQdWW/34/H4/tD3dcIZG+zXC5Xq9XToEY0DtmL6AXVtu3LpzT++NKD7N/l3bKl8XeawyVbr9eLxaJjgp7VHMhumUwmfdZ4zdFMyG47Ce3CPk7TnMf9x3DJNptN0zQ9J2um5g+abDabfbvt0nwdNVCy4DdazzfyD5KpQk6n04ADdZSOHRyZ+nbMqqRjnTT2TGRP3Tv4c9ZDY890BU/dO7hgeWjsOchedu+weGjs5mQd3Tu4mZZt7OZkHd07eFks29htyT5277CUbeyGZD27d/DnSanGbkhmumUv2NityL7q3mEp1dhNyNSi8/QbnSV/Y6+N3jJ5WnTOcxmSBXfvsOhcmX9jT0xWZH0RmfW6aUWWpHv7b+wpT1Nwr2S6B7QiS9i9nTf2NGTJu7fnxl6nulYXX/5laewJ/k6j7u22sceS5Vx3nXwKxZK5+rksT2OPIsvQvR3uqKPI/Py2mPPaosiu16tbssvlYrVtjjn4fD6Phhf+VQIyyCCDDDICGWSQQQYZgQwyyCCDjEAGGWSQQQYZgQwyyCCDjEAGGWSQQUYggwwyyCAjt/wJMACiAB4pE2W/1AAAAABJRU5ErkJggg==);
    }
  }
</style>
