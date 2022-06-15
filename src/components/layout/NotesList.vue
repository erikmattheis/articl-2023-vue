<template>
  <ul>
    <li
      v-for="note in notes || [] "
      :key="note.fullText"
    >
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
          :id="articl.id"
          :title="articl.title"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

import { NoteActions } from "@/components/layout/NoteActions.vue";

export default {
  name: "NoteListt",
  components: {
    NoteActions,
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
