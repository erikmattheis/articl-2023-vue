<template>
  <ul class="note-actions admin">
    <li>
      <a
        href="#"
        @click.prevent="$emit('edit-mode')"
      >
        edit
      </a>
    </li>
    <li>
      <a href="#">Change status</a>
    </li>
    <li>
      <router-link :to="{ name: 'deleteNote', params: { id, fullText, slug } }">
        delete
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { defineEmit, defineProps, reactive } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  fullText: {
    type: String,
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
});

</script>
