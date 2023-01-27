export default {
  computed: {
    isLoggedInMixin() {
      return this.$store.state.tokens.accessTokenExpires > Date.now();
    },
  },
};
