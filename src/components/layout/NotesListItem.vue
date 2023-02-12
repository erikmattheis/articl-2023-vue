<template>
  <div class="container">
    <div class="box main-line">
      <p>{{ note.fullText }}</p>
      <small>–{{ note.author.nameFirst }} {{ note.author.nameLast }}</small>
    </div>
    <div
      v-if="isLoggedInMixin"
      class="box">
      <note-actions
        :id="note.id"
        @edit-mode="isEditing = true" />
    </div>
  </div>
</template>

<script>
import NoteActions from '@/components/layout/NoteActions.vue';
import axiosInstance from '@/services/axiosService';

export default {
  components: {
    NoteActions,
  },
  props: {
    passedNote: {
      type: Object,
      default: null,
    },
  },
  emits: ['edit-mode'],
  data: () => ({
    isEditing: false,
    isLoading: false,
  }),

  created() {
    this.note = this.passedNote;
  },
  methods: {
    async getCurrentNote(id) {
      try {
        this.isLoading = true;

        this.isEditing = false;

        const result = await this.getNote(id);

        this.note = result.data;

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async getNote(id) {
      return axiosInstance({
        method: 'GET',
        url: `/notes/${id}`,
      });
    },
  },
};
</script>
<style scoped type="scss">
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: minmax(min-content, 1fr) min-content;
    color: #444;
  }
</style>
