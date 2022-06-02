<template>
  <article>
    <!--<pre>{{ JSON.stringify(articls, null, 2) }}</pre>-->

    <h2>{{ title }}</h2>
    {{ articlTypes }}
    <draggable-items
      tag="ul"
      v-model="categories"
      item-key="slug"
      handle=".handleu"
      glost-class="ghost"
      @change="updateData"
    >
      <template #item="{ element }">
        <li :key="element.slug">
          <router-link
            :to="{
              name: 'categoryPage',
              params: { slug: element.slug },
            }"
          >
            {{ element.title }}
          </router-link>
        </li>
      </template>
    </draggable-items>

    <ul v-if="isLoggedIn">
      <li>
        <router-link
          :to="{
            name: 'createCategoryPage',
            query: { parentSlug: $route.params.slug },
          }"
        >
          New Category Here
        </router-link>
      </li>
      <li>
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

    <template v-for="articlType in articlTypes" :key="articlType">
      <ul>
        <li v-for="articl in articls[articlType] || []" :key="articl.id">
          {{ articl.title }}
          <articls-list-item :articl="articl" />
        </li>
      </ul>
    </template>
  </article>
</template>

<script>
import { groupBy } from "lodash";
import DraggableItems from "vuedraggable";
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";
import { isLoggedIn } from "@/services/tokensService";

export default {
  name: "categoryPage",
  components: { DraggableItems, ArticlsListItem },
  data() {
    return {
      isLoading: true,
      slug: null,
      title: "",
      categories: [],
      articls: [],
      articlTypes: [],
    };
  },
  async created() {
    this.updateData();
  },
  computed: {
    isLoggedIn,
  },
  watch: {
    "$route.params.slug": {
      handler() {
        this.updateData();
      },
      immediate: true,
    },
  },
  methods: {
    async updateData() {
      const results = await this.fetchData(this.$route.params.slug);
      this.categories = results.categories;
      this.articlTypes = results.articlTypes;
      this.articls = results.articls;
      console.log("categories", this.categories?.length);
      console.log("articlTypes", this.articlTypes?.length);
      console.log("articls", this.articls?.length);
    },
    async fetchData(slug) {
      const result = await this.getCategoryPageBySlug(slug);

      const documentTitle = result?.category[0]?.title;
      this.title = documentTitle;
      const metaDescription = result?.category[0]?.description;
      this.isLoading = false;

      this.$store.dispatch("metas/setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });

      return {
        categories: result.categories,
        articlTypes: result.articls?.length
          ? [...new Set(result.articls.map((item) => item.type))]
          : [],
        articls: groupBy(result.articls, (articl) => articl.type),
      };
    },

    async getCategoryPageBySlug(slug) {
      const result = await this.$http({
        method: "GET",
        url: `/d/${slug || ""}`,
      });

      return result.data;
    },
  },
};
</script>

<style scoped>
pre {
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
