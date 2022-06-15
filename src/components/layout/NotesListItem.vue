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
      <li class="main-line">{{ note.fullText }}</li>
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
    note: {
      type: Object,
      default: null,
    },
  },
  data: () => {

    return {
      isEditing: false,
    };

  },

  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },
};
</script>

<style scoped>

</style>

