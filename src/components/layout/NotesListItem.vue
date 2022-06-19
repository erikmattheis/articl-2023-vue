<template>
  <template v-if="!isEditing">
    <ul>
      <li class="detail-line">
        <template v-if="note.author?.nameFirst || note.author?.nameLast">
          {{ note.author.nameFirst }} {{ note.author.nameLast }}
        </template>
        <template v-else>
          Anonymous
        </template>
        <span class="right"> created at: {{ note.createdAt }}</span>
      </li>
      <li
        class="main-line"
      >
        <span :aria-busy="isLoading" /> <span v-if="!isLoading">{{ note.fullText }}</span>
      </li>
    </ul>
    <div v-if="isLoggedIn">
      <note-actions
        :id="note.id"
        :full-text="note.fullText"
        @edit-mode="isEditing = true"
      />
    </div>
  </template>
  <note-crud
    v-else
    :passed-id="note.id"
    @view-mode="getCurrentNote"
  />
</template>

<script>
import { mapGetters } from "vuex";

import NoteActions from "@/components/layout/NoteActions.vue";
import NoteCrud from "@/components/layout/NoteCrud.vue";

export default {
  name: "NoteListItem",
  components: {
    NoteActions, NoteCrud,
  },
  props: {
    passedNote: {
      type: Object,
      default: null,
    },
  },
  data: () => {

    return {
      isEditing: false,
      isLoading: false,
    };

  },

  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },

  created() {

    this.note = this.passedNote;

  },
  methods: {
    async getCurrentNote(id) {

      console.log("well it is", id);

      try {

        this.isLoading = true;

        this.isEditing = false;

        const result = await this.getNote(id);

        console.log("result.data", result.data);

        this.note = result.data;

        Object.assign(this, result.data);

        this.isLoading = false;

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },
    async getNote(id) {

      return this.$http({
        method: "GET",
        url: `/notes/${id}`,
      });

    },
  },
};
</script>

