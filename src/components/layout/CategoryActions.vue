<template>
  <div class="row-admin-box box">

    <router-link
      role="button"
      :to="{ name: 'editCategory', params: { id } }">
      <vue-feather
        size="0.7rem"
        type="edit"
        aria-label="Drag to reorder" />
    </router-link>

    <router-link
      role="button"
      :to="{ name: 'DeleteCategoryPage', params: { slug: decodeURIComponent(slug) } }">
      <vue-feather
        size="0.7rem"
        type="delete"
        aria-label="Drag to reorder" />
    </router-link>

    <a
      role="button"
      class="handle"
      href="#">
      <div class="sr">Reorder category</div>
      <vue-feather
        size="0.7rem"
        type="move"
        aria-label="Drag to reorder" />
    </a>

  </div>
</template>

<script>
import VueFeather from "vue-feather";

export default {
  name: "CategoryActions",
  components: {
    VueFeather,
  },
  data() {
    return {
      slug: this.$route.params.slug || 0,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
a {
  align-self: center;
  justify-self: center;
  border: 0;
}
</style>
