export default {
  methods: {
    $setSlideReady() {
      this.$root.$emit('slide-ready');
    },

    $onSlideReady(cb) {
      if (!cb) throw new Error(`[App] Missing callback for "$onSlideReady."`);
      this.$root.$on('slide-ready', cb)
    },
  },
}
