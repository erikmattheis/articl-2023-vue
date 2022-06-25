<template>
  <nav>
    <ul>
      <li
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb"
      >
        <router-link
          :to="{ name: 'categoryPage', query: { slug : breadcrumb.slug } }"
        >
          {{ breadcrumb.title }}
        </router-link>
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
nav a {
  display: inline-block;
  padding: 0.75rem;
  color: #f391e3;
  text-decoration: none;
  border: 1px solid transparent;
}

nav a:active,
nav a:hover,
nav a.router-link-active {
  border: 1px solid #f391e3;
}

li {
  display: inline-block;
  margin: 0 0.5rem;
}
</style>
