<template>
  <div class="container">
    <div>
      <p>{{ note.fullText }}</p>
      <small>–{{ note.author.nameFirst }} {{ note.author.nameLast }}</small>
    </div>
    <div
      v-if="isLoggedInMixin"
      class="box">
      <note-actions
        :note="note" />
    </div>
  </div>
  <div v-if="confirmDelete">
    <p>Permanently delete note that starts "{{ fullText.substring(0,40) }}..."?</p>

    <button @click="deleteNote(note.id)">
      Yes
    </button>
    <button @click="confirmDelete = false">
      No
    </button>
  </div>
</template>

<script>
import NoteActions from '@/components/layout/NoteActions.vue';

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

  async created() {
    this.note = this.passedNote;
  },

  methods: {},
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
