<template>
  <article v-if="!isLoading">

    <the-breadcrumbs />

    <h2>{{ title }}</h2>

    <categories-tabs v-if="treeLevel > 3" />

    <router-view :class="{ 'nav-content': treeLevel > 3 }" />

    <directory-actions
      v-if="isLoggedInMixin"
      :tree-level="treeLevel" />
  </article>
</template>

<script>
import { groupBy } from "lodash";
import { mapGetters } from "vuex";

import CategoriesTabs from "@/components/layout/CategoriesTabs.vue";
import DirectoryActions from "@/components/layout/DirectoryActions.vue";
import TheBreadcrumbs from "@/components/layout/TheBreadcrumbs.vue";
import axiosInstance from "@/services/axiosService";

export default {
  name: "ResourcePage",
  components: {
    CategoriesTabs,
    DirectoryActions,
    TheBreadcrumbs,
  },
  data() {
    return {
      isLoading: true,
      title: "",
      slug: "",
    };
  },
  computed: {
    ...mapGetters({
      treeLevel: "resources/treeLevel",
      articls: "resources/articls",
      articlTypes: "resources/articlTypes",
      categories: "resources/categories",
      notes: "resources/notes",
    }),
  },
  watch: {
    "$route.params.slug": {
      handler() {
        this.updateData();
      }
    },
  },
  created() {

    console.log("this one created")

    this.setTitleAndDescriptionMixin({
      titleHtml: "Resource",
    });
  },
  methods: {
    async updateData() {
      try {
        this.isLoading = true;
        const results = await this.fetchData(this.$route.params.slug);

        if (results.categories?.length) {
          this.$store.dispatch("resources/categories", results.categories);
        } else {
          this.$store.dispatch("resources/categories", []);
        }

        if (results.breadcrumbs?.length) {
          this.$store.dispatch("resources/breadcrumbs", results.breadcrumbs);
        } else {
          this.$store.dispatch("resources/breadcrumbs", []);
        }

        if (results.articls) {
          this.$store.dispatch("resources/articls", results.articls);
          this.$store.dispatch("resources/articlTypes", results.articlTypes);
        } else {
          this.$store.dispatch("resources/articls", []);
          this.$store.dispatch("resources/articlTypes", []);
        }

        if (results.notes?.length) {
          this.$store.dispatch("resources/notes", results.notes);
        }

        this.title = results.category[0]?.title;

        this.titleHtml = results.category[0]?.titleHtml;

        const description = results.category[0]?.description;

        this.setTitleAndDescriptionMixin({
          titleHtml: this.titleHtml,
          description,
        });
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchData(slug) {
      const result = await axiosInstance({
        method: "GET",
        url: `/resource/${slug || ""}`,
      });

      return {
        breadcrumbs: result.data.breadcrumbs,
        categories: result.data.categories,
        category: result.data.category,
        articlTypes: result.data.articls?.length ? [...new Set(result.data.articls.map((item) => item?.type))] : [],
        articls: groupBy(result.data.articls, (articl) => articl?.type),
        notes: result.data.notes,
      };
    },
  },
};
</script>
