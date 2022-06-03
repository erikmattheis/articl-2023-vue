<template>
  <article>
    <h1>{{ resultTitle }}</h1>
    <p v-if="resultTitle">Please <a href="/login">log in</a> to continue.</p>
  </article>
</template>

<script>
import { setTitleAndDescription } from "@/services/htmlMetaService";
export default {
  name: "verifyEmailPage",
  data() {
    return {
      resultTitle: null,
      result: null,
    };
  },
  mounted() {
    this.submitForm();
    this.setTitleAndDescription({
      title: "Forgot Password",
    });
  },
  methods: {
    setTitleAndDescription,
    async submitForm() {
      this.buttonDisabled = true;
      this.$http({
        method: "GET",
        url: `/auth/verify-email?token=${this.$route.query.token}`,
      })
        .then((response) => {
          if (response?.status === 204) {
            this.resultTitle = "Email verified";
          } else {
            this.$store.dispatch("errors/setError", response);
          }
        })
        .catch((error) => {
          this.$store.dispatch("errors/setError", error);
        })
        .finally(() => {
          this.buttonDisabled = false;
        });
    },
  },
};
</script>
