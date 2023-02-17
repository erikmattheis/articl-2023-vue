<template>
  <article v-if="!deleted">
    <h1>Delete Articl</h1>
    <p>Really delete "{{ title }}"?</p>
    <form>
      <button
        :aria-busy="buttonDisabled"
        @click.prevent="deleteArticl()">
        Delete
      </button>
    </form>
  </article>
  <article v-else>
    <h1>Articl Deleted</h1>
    <a
      tabindex="0"
      href
      @click.prevent="$router.push({ name: 'TabArticls', params: { slug, type } })"
      @keyup.enter.prevent="$router.push({ name: 'TabArticls', params: { slug, type } })">Return to Category Page </a>
  </article>
</template>

<script>
import axiosInstance from '@/services/axiosService';

export default {
  name: 'DeleteArticlPage',
  data: () => ({
    buttonDisabled: false,
    deleted: false,
    id: '',
    slug: '',
    type: '',
    title: '',
  }),
  mounted() {
    this.id = this.$route.params.id;
    this.slug = this.$route.params.slug;
    this.type = this.$route.params.type;
    this.title = this.$route.params.title;
  },
  methods: {

    async deleteArticl() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.deleted = true;

        this.$store.dispatch('modals/setSuccessTitle', 'Deletion successful.');

        this.$store.dispatch(
          'modals/setSuccessMessage',
          `The articl "${this.title}" has been permanently deleted.`,
        );
        this.deleted = true;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    async getArticl(id) {
      return axiosInstance({
        method: 'GET',
        url: `/articls/${id}`,
      });
    },

    async submitDelete(id) {
      return axiosInstance({
        method: 'DELETE',
        url: '/articls',
        data: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
.grid {
  white-space:nowrap;
}

.grid a {
  display:inline-block;
}
a {
  align-self: center;
  justify-self: center;
  border:0;
}
</style>
