<template>
  <ul class="note-actions">
    <li>
      <router-link :to="{ name: 'editNote', params: { passedId: id } }">
        edit
      </router-link>
    </li>
    <li>
      <a>Change status</a>
    </li>
    <li>
      <router-link :to="{ name: 'deleteNote', params: { id, fullText } }">
        delete
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NoteActions",
  props: {
    id: {
      type: String,
      default: "",
    },
    fullText: {
      type: String,
      default: "",
    },
  },
  data: () => {

  },
};
</script>

<style scoped>

</style>
