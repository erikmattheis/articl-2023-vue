<template>
  <article>
    <h2>{{ title }} <span :aria-busy="isLoading"></span></h2>
    <draggable-items
      tag="ul"
      v-model="categories"
      item-key="slug"
      handle=".handle"
      ghost-class="ghost"
      @change="onUpdateOrderValues"
    >
      <template #item="{ element }">
        <li :key="element.slug">
          <router-link
            :to="{ name: 'categoryPage', params: { slug: element.slug } }"
          >
            {{ element.title }}
          </router-link>
        </li>
      </template>
    </draggable-items>

    <li v-if="isLoggedIn">
      <router-link
        :to="{
          name: 'createCategoryPage',
          query: { parentSlug: $route.params.slug },
        }"
      >
        New Category Here
      </router-link>
    </li>
    <li v-if="isLoggedIn">
      <router-link
        :to="{
          name: 'createArticlPage',
          query: { slug: $route.params.slug },
        }"
      >
        New Articl Here
      </router-link>
    </li>
    <template v-for="type in articls" v-bind:key="type">
      {{ link }}
      <ul>
        <li v-for="articl in this.articls[type] || []" :key="articl.id">
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
      this.categories = await this.fetchData(this.$route.params.slug);
    },

    async onUpdateOrderValues() {},
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
        this.types = [...new Set(this.categories.map((item) => item.type))];
        const grouped = groupBy(result.articls, (articl) => articl.type);
        const articls = [];
        for (const type in this.types) {
          articls[type] = grouped.filter(function (e) {
            return e.type === type;
          });
        }
        console.log("result", articls);
        return articls;
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.isLoading = false;
      }
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
