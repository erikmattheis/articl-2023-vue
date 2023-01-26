<template>
  <article v-if="!isLoading">
    <the-breadcrumbs />

    <h2>{{ title }}</h2>

    <ul
      v-if="treeLevel > 1"
      class="nav-tabs">
      <router-link
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: 'TabArticls' }">
        <li :class="{ active: isActive }">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"> Articls </a>
        </li>
      </router-link>

      <router-link
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: 'TabNotes' }">
        <li :class="{ active: isActive }">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"> Notes </a>
        </li>
      </router-link>

      <router-link
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: 'TabBlogs' }">
        <li :class="{ active: isActive }">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"> Blogs </a>
        </li>
      </router-link>

      <router-link
        v-slot="{ isActive, navigate }"
        custom
        :to="{ name: 'TabQuestionsAnswers' }">
        <li :class="{ active: isActive }">
          <a
            href
            @click.prevent="navigate()"
            @keyup.enter.prevent="navigate()"> Q&amp;A </a>
        </li>
      </router-link>
    </ul>

    <router-view :class="{ 'nav-content': treeLevel > 1 }" />

    <directory-actions
      v-if="isLoggedInMixin"
      :level="treeLevel" />
  </article>

  <loading-placeholder v-else />
</template>

<script>
import { groupBy } from 'lodash';
import { mapGetters } from 'vuex';

import DirectoryActions from '@/components/layout/DirectoryActions.vue';
import TheBreadcrumbs from '@/components/layout/TheBreadcrumbs.vue';
import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';
import axiosInstance from '@/services/axiosService';

export default {
  name: 'CategoryPage',
  components: {
    LoadingPlaceholder,
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

    /*

      const sortingArray = ['Podcasts', 'Review (OA)', 'Review (PA)', 'Research (OA)', 'Research (PA)', 'Web', 'Images', 'Videos'];
      const articlTypes = Object.keys(result.data.articls).sort((a, b) => sortingArray.indexOf(a) - sortingArray.indexOf(b));
      const groupedArticls = groupBy(result.data.articls, 'type');
      console.log('groupedArticls', groupedArticls);
      const groupedSortedArticls = sortingArray.reduce((acc, type) => {
        acc[type] = groupedArticls[type] || [];
        return acc;
      }, {});
      console.log('groupedSortedArticls', groupedSortedArticls);
      /*
      const { data } = result;

      const groupedArticls = groupBy(data.articls, 'type');

      const sortedArticls = sortingArray.reduce((acc, type) => {
        acc[type] = groupedArticls[type] || [];
        return acc;
      }, {});

      const articlTypes = Object.keys(groupedArticls).sort((a, b) => sortingArray.indexOf(a) - sortingArray.indexOf(b));

      const articls = Object.entries(sortedArticls);

      console.log(JSON.stringify(articls));

      return {
        breadcrumbs: result.data.breadcrumbs,
        categories: result.data.categories,
        category: result.data.category,
        articlTypes,
        articls: groupedSortedArticls,
        notes: result.data.notes,
      };
      */

  },
};
</script>
