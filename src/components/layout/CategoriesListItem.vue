<template>
  <li class="container">
    <router-link
      class="box"
      :to="{ name: tabName, params: { slug: category.slug } }">
      {{ category.title }}
    </router-link>
    <category-actions
      v-if="isLoggedInMixin"
      :id="category.id"
      class="box"
      :slug="category.slug" />
  </li>
</template>

<script>

import CategoryActions from "@/components/layout/CategoryActions.vue";

export default {
  name: "CategoriesListItem",

  components: {
    CategoryActions,
  },
  props: {
    category: {
      type: Object,
      default: undefined,
    },
    treeLevel: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    tabName() {
      return this.treeLevel !== 3 ? "TabCategories" : "ArticlsList";
    },
  },
  created() {
    console.log("category.slug", this.category.slug);
  },
  methods: {

  },
};

</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: minmax(min-content, 1fr) min-content;
  color: #444;
}

li {
  width: 100%;
  padding: 0 !important;

  a {
    cursor: pointer;
  }
}

li:hover {
  background-color: var(--primary-nav-background);
}
</style>
