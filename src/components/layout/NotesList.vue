<template>
  <div class="tab-content">
    <h2>Notes ({{notes?.length}})</h2>

    <details>
      <summary>Add Q & A</summary>
      <notes-form />
    </details>

    <ul v-if="notes && notes.length">
      <li v-for="note in notes || []"
        :key="note.id">
        <notes-list-item :passed-note="note" @note-updated="noteUpdated"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NotesForm from '@/components/layout/NotesForm.vue';
import NotesListItem from '@/components/layout/NotesListItem.vue';

export default {
  name: 'TabNotes',
  components: { NotesListItem, NotesForm },
  props: {
    items: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      notes: 'categoryPages/notes',
    }),
  },
  created() {
    /* TODO get category name */
    this.setTitleAndDescriptionMixin({
      title: 'Articl Notes',
    });
  },
  methods: {
    noteUpdated(note) {
      this.notes.find(({ id }) => id === note.id).fullText = note.fullText;
    },
  },
};

</script>
