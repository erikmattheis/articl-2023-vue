<template>
  <article v-if="!deleted">
    <h1>Delete Articl</h1>
    <p>Really delete the note <span v-if="note.fullText?.length > 64"> that begins, </span> "{{ note.fullText?.substring(0, 64) }}"?</p>
    <form>
      <button
        :aria-busy="buttonDisabled"
        @click.prevent="deleteNote()">
        Delete
      </button>
    </form>
  </article>
  <article v-else>
    <h1>Note Deleted</h1>
    <a
      tabindex="0"
      href
      @click.prevent="$router.push({ name: 'TabNotes', params: { slug, type } })"
      @keyup.enter.prevent="$router.push({ name: 'TabNotes', params: { slug, type } })">Return to Category Page </a>
  </article>
</template>

<script>
import axiosInstance from '@/services/axiosService';

export default {
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
    this.getCurrentNote(this.id);
  },
  methods: {
    async getCurrentNote(id) {
      try {
        this.isLoading = true;

        const result = await this.getNote(id);
        Object.assign(this, result.data);

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async deleteNote() {
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
    async getNote(id) {
      return axiosInstance({
        method: 'GET',
        url: `/notes/${id}`,
      });
    },

    async submitDelete(id) {
      return axiosInstance({
        method: 'DELETE',
        url: '/notes',
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
