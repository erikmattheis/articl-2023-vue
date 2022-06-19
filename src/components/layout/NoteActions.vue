<template>
  <ul class="note-actions">
    <li>
      <a
        href="#"
        @click.prevent="$emit('edit-mode')"
      >
        edit
      </a>
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
  emits: ["edit-mode"],
};
</script>

