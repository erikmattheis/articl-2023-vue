<template>
  <article v-if="!deleted">
    <h1>Delete Articl</h1>
    <p>Really delete "{{ title }}"?</p>
    <form>
      <button
        v-if="!!id"
        :aria-busy="buttonDisabled"
        @click.prevent="deleteArticl()">
        Delete
      </button>
    </form>
  </article>
  <article v-else>
    <h1>Deletion successful</h1>
    <p>The articl "{{ title }}" has been permanently deleted.</p>

    <p>
      slug:{{ slug }}
      Return to <router-link
        :to="{ name: 'TabArticls', params: { slug, type } }">
        category
      </router-link>.
    </p>
  </article>
</template>

<script>
import axiosInstance from '@/services/axiosService';

export default {
  name: 'DeleteArticl',
  components: {
  },
  props: {
    id: {
      default: () => '',
      type: String,
    },
    slug: {
      default: () => '',
      type: String,
    },
    title: {
      default: () => '',
      type: String,
    },
    type: {
      default: () => '',
      type: String,
    },
  },
  data: () => ({
    buttonDisabled: false,
    deleted: false,
  }),
  mounted() {

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
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
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
