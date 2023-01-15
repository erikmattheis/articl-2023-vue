<template>
  <div class="admin grid">
    <router-link
      :to="{ name: 'editCategory'}">
      edit
    </router-link>

    <router-link
      :to="{ name: 'deleteCategory'}">
      delete
    </router-link>

    <a
      class="handle"
      href="#"><div class="sr">Reorder category</div>
      <vue-feather
        size="1rem"
        type="move"
        aria-label="Drag to reorder" />
    </a>
  </div>
</template>

<script>
import VueFeather from 'vue-feather';

export default {
  name: 'CategoryActions',
  components: {
    VueFeather,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    expanded: false,
  }),
  computed: {

  },
};
</script>
