<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    beforeUpdate() {
      const clm = ['veeva', 'pharma-touch', 'mi-touch'];
      const appEl = document.getElementById('app');

      clm.forEach(key => {
        if (sessionStorage.getItem(`clm-elements-${key}`) === 'true') {
          appEl.setAttribute(`clm-elements-${key}`, 'true')
        } else {
          appEl.removeAttribute(`clm-elements-${key}`);
        }
      });
    }
  }
</script>

<style lang="scss">
  #app {
    &[clm-elements-veeva=true] {
      &:before {
        content: 'asd';
        position: fixed;
        top: 0;
        z-index: 99999;

        font-size: 2em;
      }
    }
  }

</style>
