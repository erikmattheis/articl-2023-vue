<template>
  <article>
    <h2>{{ title }} <span :aria-busy="isLoading"></span></h2>
    <ul>
      <li v-for="category in categories || []" :key="category.slug">
        <router-link
          :to="{ name: 'categoryPage', params: { slug: category.slug } }"
        >
          {{ category.title }}
        </router-link>
      </li>

      <li v-if="$store.getters['tokens/isLoggedIn']">
        <router-link
          :to="{
            name: 'createCategoryPage',
            query: { parentSlug: $route.params.slug },
          }"
        >
          New Category Here
        </router-link>
      </li>
      <li v-if="$store.getters['tokens/isLoggedIn']">
        <router-link
          :to="{
            name: 'createArticlPage',
            query: { slug: $route.params.slug },
          }"
        >
          New Articl Here
        </router-link>
      </li>
    </ul>
    <ul>
      <li v-for="type in articls || []" :key="type">
        <h2>{{ type[0].type }}</h2>
        <ul>
          <li v-for="articl in type || []" :key="articl.id">
            <h3>{{ articl.title }}</h3>
            <small>{{ articl.authors }}</small>
            <small>{{ articl.journal }}</small>
          </li>
        </ul>
      </li>
    </ul>
  </article>
</template>

<script>
import { groupBy } from "lodash";
// import TheBreadcrumbs from '@/components/layout/TheBreadcrumbs.vue';

export default {
  name: "categoryPage",
  // components: { TheBreadcrumbs },
  data() {
    return {
      isLoading: true,
      slug: null,
      title: "",
      categories: [],
      articls: [],
    };
  },
  created() {
    this.categories = this.fetchData(this.$route.params.slug);
  },
  watch: {
    "$route.params.slug": {
      handler(slug) {
        this.fetchData(slug);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchData(slug) {
      try {
        this.isLoading = true;
        const result = await this.getCategoryPageBySlug(slug);
        const documentTitle = result?.category[0]?.title;
        this.title = documentTitle;
        const metaDescription = result?.category[0]?.description;
        this.$store.dispatch("metas/setMetaDescriptionAndDocumentTitle", {
          documentTitle,
          metaDescription,
        });
        this.categories = result.categories;
        this.articls = groupBy(result.articls, (articl) => articl.type);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.isLoading = false;
      }
    },
    getCategoryPageBySlug(slug) {
      return this.$http({
        method: "GET",
        url: `/d/${slug || ""}`,
      })
        .then((result) => {
          if (result.data) {
            return result.data;
          }
          return this.$store.dispatch("errors/setError", result);
        })
        .catch((error) => this.$store.dispatch("errors/setError", error));
    },
  },
};
</script>
