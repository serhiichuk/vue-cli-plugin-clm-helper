export default {
  methods: {
    $appReady() {
      this.$root.$emit('app-ready');
    },

    $onAppReady(cb) {
      if (!cb) throw new Error(`[App] Missing callback for "$onAppReady."`);
      this.$root.$on('app-ready', cb)
    },
  },
}
