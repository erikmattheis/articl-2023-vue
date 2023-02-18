<template>
  <div class="container">
    <div>
      <p>{{ note.fullText }}</p>
      <small>–{{ note.author?.nameFirst }} {{ note.author?.nameLast }}</small>
    </div>
    <div
      v-if="noteIsUsers && isLoggedInMixin"
      class="box">
      <div class="row-admin-box">
        <router-link
          role="button"
          :to="{ name: 'editNote', params:{ id: note.id }}">
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
  </div>
  <notes-form
    v-if="routeName === 'editNote' && note.id === $route.params.id"
    :passed-note="note" />

  <notes-delete
    v-else-if="routeName === 'deleteNote' && note.id === $route.params.id"
    :passed-note="note" />
</template>

<script>
import { mapGetters } from 'vuex';
import NotesDelete from '@/components/layout/NotesDelete.vue';
import NotesForm from '@/components/layout/NotesForm.vue';
import VueFeather from 'vue-feather';

export default {
  components: {
    NotesDelete,
    NotesForm,
    VueFeather,
  },
  props: {
    passedNote: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      note: {},
      confirmDelete: false,
      noteIsUsers: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'users/user',
    }),
    routeName() {
      return this.$route.name;
    },
  },
  created() {
    if (this.passedNote) {
      this.note = this.passedNote;
      this.noteIsUsers = this.passedNote?.author?.id === this.user?.id;
      console.log('noteIsUsers', this.$router.currentRoute);
    }
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
