<template>
  <article v-if="!isLoading">
    <h2>{{ title }}</h2>

    <ul class="nav-tabs">
      <router-link
        v-if="categories?.length"
        v-slot="{ isExactActive, navigate }"
        custom
        :to="{ 'name': 'TabCategories' }"
      >
        <li :class="{'active':isExactActive}">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"
          >
            Sub-categories
          </a>
        </li>
      </router-link>

      <router-link
        v-if="articlTypes?.length"
        v-slot="{ isExactActive, navigate }"
        custom
        :to="{ 'name': 'TabArticls'}"
      >
        <li :class="{'active':isExactActive}">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"
          >
            Articls
          </a>
        </li>
      </router-link>

      <router-link
        v-if="notes?.length"
        v-slot="{ isExactActive, navigate }"
        custom
        :to="{ 'name': 'TabNotes' }"
      >
        <li :class="{'active':isExactActive}">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"
          >
            Notes
          </a>
        </li>
      </router-link>
    </ul>
    <router-view />

    <category-page-admin-actions />
  </article>

  <article-placeholder v-else />
</template>

<script>
import { groupBy } from "lodash";
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import CategoryPageAdminActions from "@/components/layout/CategoryPageAdminActions.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "CategoryPage",
  components: {
    ArticlePlaceholder,
    CategoryPageAdminActions,
  },
  data: () => {

    return {
      isLoading: true,
      title: "",
      slug: "",
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
      articls: "categoryPages/articls",
      articlTypes: "categoryPages/articlTypes",
      categories: "categoryPages/categories",
      notes: "categoryPages/notes",
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

        // this.slug = this.$route.params.slug;

        const results = await this.fetchData(this.$route.params.slug);

        if (results.categories?.length) {

          this.$store.dispatch("categoryPages/categories", results.categories);

        } else {

          this.$store.dispatch("categoryPages/categories", []);

        }

        if (results.articls) {

          console.log("results.articls", results.articls);

          this.$store.dispatch("categoryPages/articls", results.articls);
          this.$store.dispatch("categoryPages/articlTypes", results.articlTypes);

        } else {

          this.$store.dispatch("categoryPages/articls", []);
          this.$store.dispatch("categoryPages/articlTypes", []);

        }

        if (results.notes?.length) {

          this.$store.dispatch("categoryPages/notes", results.notes);

        }

        this.title = results.category[0]?.title;

        const description = results.category[0]?.description;

        setTitleAndDescription({
          title: this.title,
          description,
        });

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.isLoading = false;

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
