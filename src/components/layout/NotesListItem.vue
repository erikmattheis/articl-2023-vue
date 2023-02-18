<template>
  <div class="container">
    <div>
      <p>{{ note.fullText }}</p>
      <small>–{{ note.author.nameFirst }} {{ note.author.nameLast }}</small>
    </div>
    <div
      v-if="noteIsUsers && isLoggedInMixin"
      class="box">
      <div class="row-admin-box">
        <router-link
          role="button"
          :to="{ name: 'editNote', params:{ editId:note.id }}">
          <vue-feather
            size="0.7rem"
            type="edit"
            aria-label="Edit note" />
        </router-link>

        <router-link
          role="button"
          :to="{ name: 'deleteNote', params: { id: note.id }}">
          <vue-feather
            size="0.7rem"
            type="delete"
            aria-label="Delete note" />
        </router-link>
      </div>
    </div>

    <notes-delete
      v-if="note.id === $route.params.id"
      :passed-note="note" />
    <!--
    <p>Permanently delete note that starts "{{ fullText.substring(0,40) }}..."?</p>

    <button @click="deleteNote(note.id)">
      Yes
    </button>
    <button @click="confirmDelete = false">
      No
    </button>
    -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NotesDelete from '@/components/layout/NotesDelete.vue';
import VueFeather from 'vue-feather';

export default {
  components: {
    NotesDelete,
    VueFeather,
  },
  props: {

    passedNote: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      note: {},
      confirmDelete: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
    }),

  },
  async created() {
    this.note = this.passedNote;
    this.noteIsUsers = this.note.author.id === this.user?.id;
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
