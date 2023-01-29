<template>
  <article>
    <form v-if="!deleted">
      <h1>Delete Articl</h1>
      <p>Really delete "{{ title }}"?</p>
      <button
        :aria-busy="buttonDisabled"
        @click.prevent="deleteArticl()">
        Delete
      </button>
    </form>
    <template v-else>
      <h1>Articl Deleted</h1>
      <a
        tabindex="0"
        href
        @click.prevent="$router.push({ name: 'TabArticls', params: { slug, type } })"
        @keyup.enter.prevent="$router.push({ name: 'TabArticls', params: { slug, type } })">Return to Category Page </a>
    </template>
  </article>
</template>

<script>
import axiosInstance from '@/services/axiosService';

export default {
  name: 'DeleteArticl',
  components: {
  },

  data: () => ({
    buttonDisabled: false,
    deleted: false,
    id: '',
    title: '',
    slug: '',
  }),
  mounted() {
    this.getCurrentArticl();
  },
  methods: {
    async getCurrentArticl() {
      try {
        this.isLoading = true;

        const result = await this.getArticl(this.$route.params.id);

        this.title = result.data.title;
        this.slug = result.data.slug;

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async deleteArticl() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.$route.params.id);
        /*
        this.$store.dispatch('modals/setSuccessTitle', 'Deletion successful.');

        this.$store.dispatch(
          'modals/setSuccessMessage',
          `The articl "${this.title}" has been permanently deleted.`,
        );
        */
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
