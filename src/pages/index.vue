<template>
  <article v-if="!isLoading">
    <h2>{{ title }}</h2>
    <ul>
      <li
        v-for=" category in categories || []"
        :key="category.slug"
      >
        <router-link :to="{ name: 'categoryPage', params: { slug: category.slug } }">
          {{ category.title }}
        </router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'createCategoryPage', query: { parentSlug: '0' } }">
          New Category Here
        </router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{ name: 'createArticlPage', query: { slug: '0' } }">
          New Articl Here
        </router-link>
      </li>
    </ul>
  </article>
  <article-placeholder v-else />
</template>

<script>
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "HomePage",
  components: {
    ArticlePlaceholder,
  },
  data: () => {

    return {
      isLoading: true,
      slug: null,
      title: "",
      categories: [],
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },

  created() {

    this.categories = this.fetchData("0");

  },
  methods: {
    async fetchData(slug) {

      try {

        this.isLoading = true;

        const result = await this.getCategoryPageBySlug(slug);
        const {
          title,
        } = result.data.category[0];
        const {
          description,
        } = result.data.category[0];

        this.title = title;

        setTitleAndDescription({
          title, description,
        });

        this.categories = result.data.categories;

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

      });

    },
  },
};
</script>

<style scoped>
p {
  padding:0;
  margin: 0;
}
</style>
