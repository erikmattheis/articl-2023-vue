<template>
  <div class="row-admin-box">
    <router-link
      role="button"
      :to="{ name: 'editNote', params:{ editId:id }}">
      <vue-feather
        size="0.7rem"
        type="edit"
        aria-label="Edit note" />
    </router-link>

    <router-link
      role="button"
      :to="{ name: 'deleteNote', params: { id }}">
      <vue-feather
        size="0.7rem"
        type="delete"
        aria-label="Delete note" />
    </router-link>
  </div>
</template>

<script>
import VueFeather from 'vue-feather';

export default {
  components: {
    VueFeather,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    fullText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fullTextExcerpt: this.fullText?.substring(0, 32),
    };
  },
};
</script>

<style scoped>
.grid {
  white-space:nowrap;
}

.grid a {
  display:inline-block;
}
a {
  align-self: center;
  justify-self: center;
  border:0;
}
</style>
