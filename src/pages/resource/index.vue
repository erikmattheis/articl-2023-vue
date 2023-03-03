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
import { groupBy } from 'lodash';
import { mapGetters } from 'vuex';

import CategoriesTabs from '@/components/layout/CategoriesTabs.vue';
import DirectoryActions from '@/components/layout/DirectoryActions.vue';
import TheBreadcrumbs from '@/components/layout/TheBreadcrumbs.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';
import axiosInstance from '@/services/axiosService';

export default {
  name: 'CategoryPage',
  components: {
    CategoriesTabs,
    DirectoryActions,
    TheBreadcrumbs,
  },
  data() {
    return {
      isLoading: true,
      title: '',
      slug: '',
    };
  },
  computed: {
    ...mapGetters({
      treeLevel: 'categoryPages/treeLevel',
      articls: 'categoryPages/articls',
      articlTypes: 'categoryPages/articlTypes',
      categories: 'categoryPages/categories',
      notes: 'categoryPages/notes',
    }),
  },
  watch: {
    '$route.params.slug': {
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

        const results = await this.fetchData(this.$route.params.slug);

        if (results.categories?.length) {
          this.$store.dispatch('categoryPages/categories', results.categories);
        } else {
          this.$store.dispatch('categoryPages/categories', []);
        }

        if (results.breadcrumbs?.length) {
          this.$store.dispatch('categoryPages/breadcrumbs', results.breadcrumbs);
        } else {
          this.$store.dispatch('categoryPages/breadcrumbs', []);
        }

        if (results.articls) {
          this.$store.dispatch('categoryPages/articls', results.articls);
          this.$store.dispatch('categoryPages/articlTypes', results.articlTypes);
        } else {
          this.$store.dispatch('categoryPages/articls', []);
          this.$store.dispatch('categoryPages/articlTypes', []);
        }

        if (results.notes?.length) {
          this.$store.dispatch('categoryPages/notes', results.notes);
        }

        this.title = results.category[0]?.title;

        const description = results.category[0]?.description;

        setTitleAndDescription({
          title: this.title,
          description,
        });
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchData(slug) {
      const result = await axiosInstance({
        method: 'GET',
        url: `/resource/${slug || ''}`,
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
