<template>
  <nav aria-label="breadcrumb">
    <ul>
      <li>
        <router-link
          :to="{ name: 'homePage'}">
          <small>Home</small>
        </router-link>
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb">
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="{ name: index < 3 ? 'TabCategories':'ArticlsList', params: { slug : breadcrumb.slug } }">
        <small>{{ breadcrumb.title }}</small>
        </router-link>
        <span v-else><small>{{ breadcrumb.title }}</small></span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheBreadcrumbs",
  computed: {
    ...mapGetters({
      breadcrumbs: "categoryPages/breadcrumbs",
    }),
  },
};
</script>

<style scoped>
body ul {
  display: block;
}

body li {
  padding-top: 0;
  padding-bottom: calc(var(--nav-element-spacing-vertical) * 0.5);
  vertical-align:top !important
}
</style>
