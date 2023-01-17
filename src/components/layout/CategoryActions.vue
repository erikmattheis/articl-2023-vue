<template>
  <div class="row-admin-box">
    <router-link
      role="button"
      :to="{ name: 'editCategory'}">
      <small>edit</small>
    </router-link>

    <router-link
      role="button"
      :to="{ name: 'deleteCategory'}">
      <small>delete</small>
    </router-link>

    <a
      role="button"
      class="handle"
      href="#"><div class="sr">Reorder category</div>
      <vue-feather
        size="0.7rem"
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

<style scoped lang="scss">
a {
  padding: 0 !important;
  width: minmax(min-content, auto);

  align-self: center;
  justify-self: center;

}
</style>
