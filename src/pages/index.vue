<template>
  <h1>Hello</h1>
  <article v-if="!isLoading">
    <h2>{{ title }}</h2>

    <categories-list />

    <directory-actions
      v-if="isLoggedInMixin"
      :tree-level="0" />
  </article>

  <loading-placeholder v-else />
  isLoading: {{ isLoading }}
</template>

<script>
import { mapGetters } from "vuex";

import DirectoryActions from "@/components/layout/DirectoryActions.vue";
import CategoriesList from "@/components/layout/CategoriesList.vue";
import LoadingPlaceholder from "@/components/ui/LoadingPlaceholder.vue";
import axiosInstance from "@/services/axiosService";

export default {
  name: "HomePage",
  components: {
    LoadingPlaceholder,
    CategoriesList,
    DirectoryActions,
  },
  data() {
    return {
      isLoading: true,
      title: "",
    };
  },
  computed: {
    ...mapGetters({
      articls: "resources/articls",
      articlTypes: "resources/articlTypes",
      categories: "resources/categories",
      notes: "resources/notes",
      user: "users/user",
    }),
  },

  created() {
    this.setTitleAndDescriptionMixin({
      titleHtml: "Articl Home",
    });
    this.updateData();
  },
  methods: {
    async updateData() {
      try {
        this.isLoading = true;

        const results = await this.fetchData();

        if (results.count) {
          this.$store.dispatch("resources/count", results.count);
        }
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

        const description = results.category[0]?.description;

        this.setTitleAndDescriptionMixin({
          titleHtml: this.title,
          description,
        });
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        console.log("is here loading false")
        this.isLoading = false;
      }
    },

    async fetchData() {
      const result = await axiosInstance({
        method: "GET",
        url: "/resource/0",
      });

      return {
        categories: result.data.categories,
        category: result.data.category,
        notes: result.data.notes,
        count: result.data.count,
      };
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
</style>
