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

      <li>
        <router-link
          :to="{ name: 'createCategoryPage', params: { slug: '0' } }"
        >
          New Category
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'createArticlPage', params: { slug: '0' } }">
          New Articl Here
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script>
// import TheBreadcrumbs from '@/components/layout/TheBreadcrumbs.vue';
// import CategoryChildren from '@/components/layout/CategoryChildren.vue';

export default {
  name: "categoryPage",
  // components: { TheBreadcrumbs, CategoryChildren },
  data() {
    return {
      isLoading: true,
      slug: null,
      title: "",
      categories: [],
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
        this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
          documentTitle,
          metaDescription,
        });
        this.categories = result.categories;
      } catch (error) {
        this.$store.dispatch("setError", error);
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
          return this.$store.dispatch("setError", result);
        })
        .catch((error) => this.$store.dispatch("setError", error));
    },
  },
};
</script>
