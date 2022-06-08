<template>
  <article>
    <h2>{{ title }}</h2>

    <draggable-items
      v-model="categories"
      tag="ul"
      item-key="id"
      handle=".handle"
      ghost-class="ghost"
      @change="onUpdateOrderValues"
    >
      >
      <template #item="{element}">
        <categories-list-item
          :category="element"
          class="list-item"
        />
      </template>
    </draggable-items>

    <ul v-if="isLoggedIn">
      <li>
        <router-link
          :to="{
            name: 'createCategoryPage',
            query: {parentSlug: $route.params.slug},
          }"
        >
          New Category Here
        </router-link>
      </li>
      <li>
        <router-link
          :to="{
            name: 'createArticlPage',
            query: {slug: $route.params.slug},
          }"
        >
          New Articl Here
        </router-link>
      </li>
    </ul>

    <template
      v-for="articlType in articlTypes"
      :key="articlType"
    >
      <ul>
        <draggable-items
          v-model="articls[articlType]"
          tag="ul"
          item-key="id"
          handle=".handle"
          ghost-class="ghost"
          @change="onUpdateArticlsOrderValues(articlType)"
        >
          <template #item="{element}">
            <div>
              <articls-list-item
                :articl="element"
                :order="element.order"
              />
            </div>
          </template>
        </draggable-items>
      </ul>
    </template>
  </article>
</template>

<script>
import { groupBy } from 'lodash';
import DraggableItems from 'vuedraggable';

import articlsListItem from '@/components/layout/ArticlsListItem.vue';
import categoriesListItem from '@/components/layout/CategoriesListItem.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';
import { isLoggedIn } from '@/services/tokensService';

export default {
  name: 'CategoryPage',
  components: {
    DraggableItems, categoriesListItem, articlsListItem,
  },
  data: () => {

    return {
      isLoading: true,
      slug: null,
      title: '',
      categories: [],
      articls: [],
      articlTypes: [],
    };

  },
  computed: {
    isLoggedIn,
  },
  watch: {
    '$route.params.slug': {
      handler() {

        this.updateData();

      },
      immediate: true,
    },
  },
  created() {

    this.updateData();

  },
  methods: {
    async updateData() {

      const results = await this.fetchData(this.$route.params.slug);

      this.categories = results.categories;

      this.articlTypes = results.articlTypes;

      this.articls = results.articls;

      this.title = results.category[0]?.title;

      const description = results.category[0]?.description;

      setTitleAndDescription({
        title: this.title, description,
      });

      this.isLoading = false;

    },

    async fetchData(slug) {

      const result = await this.$http({
        method: 'GET',
        url: `/d/${slug || ''}`,
      });

      return {
        categories: result.data.categories,
        category: result.data.category,
        articlTypes: result.data.articls?.length
          ? [...new Set(result.data.articls.map((item) => { return item.type; }))]
          : [],
        articls: groupBy(result.data.articls, (articl) => { return articl.type; }),
      };

    },

    updateOrderValues() {

      this.categories.forEach((obj, index) => {

        const objRef = obj;

        objRef.order = index;

      });

    },

    async saveOrderValues() {

      const order = this.categories.map((obj) => {

        return {
          id: obj.id, order: obj.order,
        };

      });

      await this.saveOrder(order);

    },

    async saveOrder(order) {

      this.isLoading = true;

      const result = await this.$http({
        method: 'POST',
        url: '/categories/order',
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

      console.log('this.articls', this.articls[articlType]);

      this.articls[articlType].forEach((obj, index) => {

        const objRef = obj;

        objRef.order = index;

      });

    },

    async saveArticlsOrderValues(articlType) {

      const order = this.articls[articlType].map((obj) => {

        return {
          id: obj.id, order: obj.order,
        };

      });

      await this.saveArticlsOrder(order);

    },

    async saveArticlsOrder(order) {

      this.isLoading = true;

      const result = await this.$http({
        method: 'POST',
        url: '/articls/order',
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
  lang="css"
  scoped
>
  pre {
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  }

  .list-item {
    border-bottom:1px solid #444;
  }
</style>

