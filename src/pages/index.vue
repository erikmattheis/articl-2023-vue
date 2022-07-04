<template>
  <article v-if="!isLoading">
    isLoading:{{ isLoading }}<br>

    <the-breadcrumbs />

    <small class="small-caps">Category</small>

    <h2>{{ title }}</h2>

    <ul
      class="nav-tabs"
    >
      <router-link

        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: 'TabArticls'}"
      >
        <li :class="{'active':isActive}">
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
        v-slot="{ isActive, navigate }"
        custom
        :to="{ 'name': 'TabNotes' }"
      >
        <li :class="{'active':isActive}">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"
          >
            Notes
          </a>
        </li>
      </router-link>

      <router-link
        v-slot="{ isActive, navigate }"
        custom
        :to="{ 'name': 'TabBlogs' }"
      >
        <li :class="{'active':isActive}">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"
          >
            Blogs
          </a>
        </li>
      </router-link>

      <router-link
        v-slot="{ isActive, navigate }"
        custom
        :to="{ 'name': 'TabQuestionsAnswers' }"
      >
        <li :class="{'active':isActive}">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"
          >
            Q&amp;A
          </a>
        </li>
      </router-link>
    </ul>
    <router-view />

    <directory-actions
      v-if="isLoggedIn"
    />
  </article>

  <loading-placeholder v-else />
</template>

<script>
import { groupBy } from "lodash";
import { mapGetters } from "vuex";

import DirectoryActions from "@/components/layout/DirectoryActions.vue";
import TheBreadcrumbs from "@/components/layout/TheBreadcrumbs.vue";
import LoadingPlaceholder from "@/components/ui/LoadingPlaceholder.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "CategoryPage",
  components: {
    LoadingPlaceholder,
    DirectoryActions,
    TheBreadcrumbs,
  },
  data() {

    return {
      isLoading: true,
      title: "",
      slug: "0",
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
      treeLevel: "categoryPages/treeLevel",
      articls: "categoryPages/articls",
      articlTypes: "categoryPages/articlTypes",
      categories: "categoryPages/categories",
      notes: "categoryPages/notes",
    }),
  },
  created() {

    this.updateData();

  },
  methods: {
    async updateData() {

      try {

        this.isLoading = true;

        const results = await this.fetchData("0");

        if (results.categories?.length) {

          this.$store.dispatch("categoryPages/categories", results.categories);

        } else {

          this.$store.dispatch("categoryPages/categories", []);

        }

        this.$store.dispatch("categoryPages/articls", []);
        this.$store.dispatch("categoryPages/articlTypes", []);

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
        breadcrumbs: result.data.breadcrumbs,
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

.disabled {
  background-color: var(--form-element-disabled-background-color);
  color: var(--form-element-disabled-color);
}

.disabled a {
  padding: 0 0.5rem !important;
}
</style>
