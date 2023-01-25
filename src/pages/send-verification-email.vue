<template>
  <article>
    <p v-text="result" />
  </article>
</template>

<script>
import { setTitleAndDescription } from '@/services/htmlMetaService';
import axiosInstance from '@/services/axiosService';

export default {
  data: () => ({
    result: null,
  }),
  mounted() {
    try {
      this.sendEmail();

      setTitleAndDescription({
        title: 'Verification sent',
      });
    } catch (error) {
      this.$store.dispatch('errors/setError', error);
    }
  },
  methods: {
    async sendEmail() {
      this.result = await axiosInstance({
        method: 'GET',
        url: `/auth/send-verification-email?token=${this.$route.query.token}`,
      });

      this.result = 'Click the link in the email we sent to verify your address.';
    },
  },
};
</script>
