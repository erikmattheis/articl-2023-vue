export default {
  computed: {
    isLoggedInMixin() {
      console.log('this.$store.state.tokens.accessTokenExpires', this.$store.state.tokens.accessTokenExpires);
      return this.$store.state.tokens.accessTokenExpires > Date.now();
    },
  },
};
