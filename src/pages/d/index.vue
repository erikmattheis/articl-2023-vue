<template>
  <article>
    <!--<pre>{{ JSON.stringify(articls, null, 2) }}</pre>-->

    <h2>{{ title }}</h2>
    <draggable-items
      tag="ul"
      v-model="categories"
      item-key="slug"
      handle=".handleu"
      glost-class="ghost"
      @change="onUpdateOrderValues"
    >
      <template #item="{ element }">
        <li :key="element.slug">
          <router-link
            :to="{
              name: 'categoryPage',
              params: { $slug: element.slug },
            }"
          >
            {{ element.title }}
          </router-link>
          >
        </li>
      </template>
    </draggable-items>

    <ul v-if="isLoggedIn">
      <li>
        <router-link
          :to="{
            name: 'createCategoryPage',
            query: { $slug: $route.params.slug },
          }"
        >
          New category here
        </router-link>
        <router-link
          :to="{
            name: 'createArticlPage',
            query: { $slug: $route.params.slug },
          }"
        >
          New articl here
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
  computed: {
    isLoggedIn,
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
    async onCreated() {
      const results = await this.fetchData(this.$route.params.slug);

      this.categories = results.categories;
      this.articlTypes = results.types;
      this.articls = results;
    },

    async onUpdateOrderValues() {},
    async fetchData(slug) {
      const a = {
        id: 0,
        value: 1,
      };
      const b = {
        ...a,
        id: 1,
      };
      console.log(a === b);
      console.log(b);
      this.isLoading = true;

      const result = await this.getCategoryPageBySlug(slug);

      this.articls = result.articls;
      this.articlTypes = result.types;
      this.categories = result.categories;

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
        articlTypes: [...new Set(result.categories.map((item) => item.type))],
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
