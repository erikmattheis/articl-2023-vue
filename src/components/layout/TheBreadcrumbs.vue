<template>
  <nav>
    <ul>
      <li>
        <router-link
          :to="{ name: 'homePage'}"
        >
          Home &gt;
        </router-link>
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb"
      >
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="{ name: index < 2 ? 'TabCategories':'TabArticls', params: { slug : breadcrumb.slug } }"
        >
          {{ breadcrumb.title }} &gt;
        </router-link>
        <span v-else> {{ breadcrumb.title }}</span>
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
