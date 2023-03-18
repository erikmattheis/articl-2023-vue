export default {
  data() {
    return {
      currentTime: Date.now(),
    };
  },
  computed: {
    isLoggedInMixin() {
      return this.$store.state.tokens.accessTokenExpires > this.currentTime;
    },
  },
  mounted() {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  },
};
