<template>
  <div class="row-admin-box actions-column">
    <router-link
      v-if="treeLevel !== 4"
      :to="{ name: 'createCategoryPage', query: { parentSlug: $route.params.slug ? $route.params.slug : '0' } }"
      role="button">
      <small>New Category Here</small>
    </router-link>

    <router-link
      v-if="treeLevel === 4"
      :to="{ name: 'createArticlPage', query: { slug: $route.params.slug ? $route.params.slug : '0' } }"
      role="button">
      <small>New Articl Here</small>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "DirectoryActions",
  props: {
    treeLevel: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style type="scss" scoped>
.actions-column {
  margin-top: var(--nav-element-spacing-vertical);
  grid-template-columns: max-content max-content;
}
</style>
