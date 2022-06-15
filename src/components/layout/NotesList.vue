<template>
  <ul>
    <li
      v-for="note in notes || [] "
      :key="note.fullText"
    >
      <ul>
        <li class="detail-line">
          {{ note.author?.nameFirst }} {{ note.author?.nameLast }}

          {{ note.createdAt }}
        </li>
        <li />
      </ul>{{ note.fullText }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NotesList",
  components: {

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
