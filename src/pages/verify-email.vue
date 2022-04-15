<template>
  <article>
    <h1>{{ resultTitle }}</h1>
    <p v-html="result"></p>
  </article>
</template>

<script>
export default {
  name: "VerifyEmailPage",
  data() {
    return {
      resultTitle: null,
      result: null,
    };
  },
  methods: {
    async submitForm() {
      this.buttonDisabled = true;
      this.$http({
        method: "GET",
        url: `/auth/verify-email?token=${this.$route.query.token}`,
      })
        .then((response) => {
          if (response.status === 204) {
            this.resultTitle = "Email verified";
            this.result = `Your email address is verified. Please <a href="/login">log in</a> to continue.`;
          } else {
            this.$store.dispatch("setError", response);
          }
        })
        .catch((error) => {
          this.$store.dispatch("setError", error);
        })
        .finally(() => {
          this.buttonDisabled = false;
        });
    },
  },
  mounted() {
    this.submitForm();
  },
};
</script>
