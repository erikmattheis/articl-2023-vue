<template>
  <div class="row-admin-box actions-columns box">
    <router-link
      :to="{ name: 'createCategoryPage', query: { parentSlug: $route.params.slug ? $route.params.slug : '0' } }"
      role="button">
      <small>New Category Here</small>
    </router-link>

    <router-link
      v-if="level === 2"
      :to="{ name: 'createArticlPage', query: { slug: $route.params.slug ? $route.params.slug : '0' } }"
      role="button">
      <small>New Articl Here</small>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'DirectoryActions',
  props: {
    level: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.actions-column {
grid-template-columns: 50% 50%;
}

</style>
