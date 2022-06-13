<template>
  <article v-if="isLoggedIn">
    <h1>{{ resultTitle }}</h1>
    <p v-if="resultTitle">
      Please <a href="/login">log in</a> to continue.
    </p>
  </article>
  <article-placeholder v-else />
</template>

<script>
import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "VerifyEmailPage",
  components: {
    ArticlePlaceholder,
  },
  data: () => {

    return {
      resultTitle: null,
      result: null,
    };

  },
  mounted() {

    this.submitForm();

    setTitleAndDescription({
      title: "Forgot Password",
    });

  },
  methods: {
    async submitForm() {

      this.isLoading = true;

      const response = await this.$http({
        method: "GET",
        url: `/auth/verify-email?token=${this.$route.query.token}`,
      });

      if (response?.status === 204) {

        this.resultTitle = "Email verified";

      } else {

        this.$store.dispatch(
          "errors/setError",
          response,
        );

      }

      this.isLoading = false;

    },
  },
};

</script>
