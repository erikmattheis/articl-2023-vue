<template>
  <article>
    <p>Really delete the note by {{ note.user.nameFirst }} {{ note.user.nameLast }} that starts "{{ note.fullText.substring(0,40) }}..."?</p>
    <form>
      <button
        @click.prevent="deleteNote()">
        Delete
      </button>
    </form>
  </article>
</template>

<script>
import axiosInstance from '@/services/axiosService';

export default {
  name: 'NoteDelete',
  props: {
    note: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({}),
  mounted() {

  },
  methods: {
    async deleteNote() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$router.push({ name: 'categoryPage', params: { slug: this.slug } });
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
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
