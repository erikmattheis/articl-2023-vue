<template>
  <article v-if="!isLoading">
    <h2>{{ title }}</h2>
    there are {{ categories.length }}<br>
    and {{ typeof articls }} articls <br>
    and {{ notes.length }} notes<br>
    <ul class="nav-tabs">
      <li :class="{ active: activeTab === 0 }">
        <a
          href
        ><router-link
          :to="{ 'name': 'TabCategories', params:{items:categories}}"
        >
          Sub-categories</router-link></a>
      </li>
      <li :class="{ active: activeTab === 0 }">
        <a
          href
        ><router-link
          :to="{ 'name': 'TabArticls', params:{items:articls}}"
        >
          Articls</router-link></a>
      </li>
      <li :class="{ active: activeTab === 2}">
        <a
          href
        ><router-link
          :to="{'name':'TabNotes',params:{items:notes}}"
        >
          Notes</router-link></a>
      </li>
    </ul>
    <router-view :items="categories" />
  </article>

  <article-placeholder v-else />
</template>

<script>
import { groupBy } from "lodash";
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "CategoryPage",
  components: {
    ArticlePlaceholder,
  },
  data: () => {

    return {
      isLoading: true,
      activeTab: 0,
      title: "",
      slug: "",
      notes: [],
      categories: [],
      articls: [],
      articlTypes: [],
      articlTypeCurrent: "",
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
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

      try {

        this.isLoading = true;

        this.slug = this.$route.params.slug;

        const results = await this.fetchData(this.$route.params.slug);

        this.categories = results.categories;
        /*
        console.log("loaded this.categories", results.categories);
        console.log("loaded this.articls", results.articls);
        console.log("loaded this.notes", results.notes);
        console.log("results.articlTypes", results.articlTypes);
        console.log("this.articls!!!!!", this.articls);
*/
        console.log("this.items", this.items);
        this.articlTypes = results.articlTypes;

        [this.articlTypeCurrent] = Object.keys(results.articls);

        this.articls = results.articls;

        this.notes = results.notes?.results;

        this.title = results.category[0]?.title;

        const description = results.category[0]?.description;

        setTitleAndDescription({
          title: this.title,
          description,
        });

        this.isLoading = false;

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async fetchData(slug) {

      const result = await this.$http({
        method: "GET",
        url: `/d/${slug || ""}`,
      });

      return {
        categories: result.data.categories,
        category: result.data.category,
        articlTypes: result.data.articls?.length
          ? [
            ...new Set(
              result.data.articls.map((item) => {

                return item.type;

              }),
            ),
          ]
          : [],
        articls: groupBy(result.data.articls, (articl) => {

          return articl.type;

        }),
        notes: result.data.notes,
      };

    },

    updateOrderValues() {

      try {

        this.categories.forEach((obj, index) => {

          const objRef = obj;

          objRef.order = index;

        });

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async saveOrderValues() {

      try {

        const order = this.categories.map((obj) => {

          return {
            id: obj.id,
            order: obj.order,
          };

        });

        await this.saveOrder(order);

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async saveOrder(order) {

      this.isLoading = true;

      const result = await this.$http({
        method: "POST",
        url: "/categories/order",
        data: {
          order,
        },
      });

      this.isLoading = false;

      return result.data;

    },

    onUpdateOrderValues() {

      this.updateOrderValues();

      this.saveOrderValues();

    },

    updateArticlsOrderValues(articlType) {

      try {

        this.articls[articlType].forEach((obj, index) => {

          const objRef = obj;

          objRef.order = index;

        });

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async saveArticlsOrderValues(articlType) {

      try {

        const order = this.articls[articlType].map((obj) => {

          return {
            id: obj.id,
            order: obj.order,
          };

        });

        await this.saveArticlsOrder(order);

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async saveArticlsOrder(order) {

      this.isLoading = true;

      const result = await this.$http({
        method: "POST",
        url: "/articls/order",
        data: {
          order,
        },
      });

      this.isLoading = false;

      return result.data;

    },

    onUpdateArticlsOrderValues(articlType) {

      this.updateArticlsOrderValues(articlType);

      this.saveArticlsOrderValues(articlType);

    },
  },
};
</script>

<style
  lang="scss"
  scoped
>
pre {
  overflow: auto;
  word-break: break-all;
  white-space: pre-wrap;
}

.list-item {
  border-bottom: 1px solid var(--bg1);
}
</style>
