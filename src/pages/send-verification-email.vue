<template>
  <article>
    <p v-text="result" />
  </article>
</template>

<script>
import { setTitleAndDescription } from '@/services/htmlMetaService';

export default {
  data() {

    return {
      result: null,
    };

  },
  mounted() {

    this.sendEmail();

    setTitleAndDescription({
      title: 'Verification sent',
    });

  },
  methods: {
    async sendEmail() {

      this.result = await this.$http({
        method: 'GET',
        url: `/auth/send-verification-email?token=${this.$route.query.token}`,
      });

      this.result = 'Click the link in the email we sent to verify your address.';

    },
  },
};
</script>

<style scoped>
</style>
