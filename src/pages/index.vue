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
          New Category Here
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'createArticlPage', query: { slug: '0' } }">
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
  name: "homePage",
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
    this.categories = this.fetchData("0");
  },
  mounted() {
    this.setTitleAndDescription();
  },
  methods: {
    setTitleAndDescription() {
      const documentTitle = "Articl.net";
      const metaDescription = "";
      this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });
    },
    async fetchData(slug) {
      try {
        this.isLoading = true;
        const result = await this.getCategoryPageBySlug(slug);
        const documentTitle = result?.data?.category[0]?.title;
        this.title = documentTitle;
        const metaDescription = result?.data?.category[0]?.description;
        this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
          documentTitle,
          metaDescription,
        });
        this.categories = result.data.categories;
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
      });
    },
  },
};
</script>
