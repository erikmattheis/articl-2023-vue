<template>
  <div class="container">
    <!--
      <li>
        <span class="right"> created at: {{ note.createdAt }}</span>
      </li>
      -->
    <div class="box main-line">
      <p>{{ note.fullText }}</p>
      –{{ note.author.nameFirst }} {{ note.author.nameLast }}
    </div>
    <div
      v-if="isLoggedInMixin"
      class="box">
      <admin-actions-note
        :id="note.id"
        :full-text="note.fullText"
        :slug="note.slug"
        @edit-mode="isEditing = true" />
    </div>
  </div>
</template>

<script>
import AdminActionsNote from '@/components/layout/AdminActionsNote.vue';
import axiosInstance from '@/services/axiosService';

export default {
  components: {
    AdminActionsNote,
  },
  props: {
    passedNote: {
      type: Object,
      default: null,
    },
  },
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
    grid-template-columns: minmax(200px, 1fr) 200px;
    color: #444;
  }
</style>
