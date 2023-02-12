<template>
  <div class="tab-content">
    <h2>Notes</h2>

    <details>
      <summary>Add Note</summary>
      <notes-form />
    </details>

    <ul>
      <li
        v-for="note in notes || []"
        :key="note.id">
        <notes-list-item :passed-note="note" />
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
};

</script>
