<template>
  <ul>
    <li
      v-for="note in notes || [] "
      :key="note.fullText"
    >
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
          />
        </div>
      </template>
      <note-crud
        v-else
        :passed-id="note.id"
      />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

import NoteActions from "@/components/layout/NoteActions.vue";
import NoteCrud from "@/components/layout/NoteCrud.vue";

export default {
  name: "NoteList",
  components: {
    NoteActions, NoteCrud,
  },
  props: {
    notes: {
      type: Array,
      default: () => { return []; },
    },
  },
  data: () => {

    return {
      isLoading: true,
      isEditing: false,
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },

  methods: {

  },
};
</script>

<style scoped>

</style>
