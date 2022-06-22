<template>
  <article v-if="!isLoading">
    <h2>{{ title }}</h2>

    <router-link
      :to="{'name':'notesTab'}"
    >
      notes
    </router-link>
    <router-link
      :to="{'name':'categoriesTab'}"
    >
      categories
    </router-link>
    <router-view
      v-slot="{ Component }"
    >
      <component :is="Component" />
    </router-view>
    <ul class="nav-tabs">
      <li :class="{ active: activeTab === 0 }">
        <a
          href
          @click.prevent="activeTab = 0"
          @keyup.enter.prevent="activeTab = 0"
        >
          Sub-categories &amp; Articls</a>
      </li>
      <li :class="{ active: activeTab === 1 }">
        <a
          href
          @click.prevent="activeTab = 1"
          @keyup.enter.prevent="activeTab = 1"
        >
          Notes</a>
      </li>
    </ul>

    <div
      v-show="activeTab === 0"
      class="tab-content"
    >
      <draggable-items
        v-model="categories"
        tag="ul"
        item-key="id"
        handle=".handle"
        ghost-class="ghost"
        @change="onUpdateOrderValues"
      >
        <template #item="{ element }">
          <categories-list-item
            :category="element"
            class="list-item"
          />
        </template>
      </draggable-items>

      <div v-if="isLoggedIn">
        <router-link
          :to="{
            name: 'createCategoryPage',
            query: {parentSlug: $route.params.slug},
          }"
        >
          <a
            href
            role="button"
          >
            New Category Here
          </a>
        </router-link>
      </div>

      <ul class="nav-tabs">
        <li
          v-for="articlType in articlTypes"
          :key="articlType"
          :class="{ active: articlTypeCurrent === articlType }"
        >
          <a
            href
            @click.prevent="articlTypeCurrent = articlType"
            @keyup.enter.prevent="articlTypeCurrent = articlType"
          >
            {{ articlType }}</a>
        </li>
      </ul>

      <h3>{{ articlTypeCurrent }}</h3>

      <ul v-if="articlTypeCurrent">
        <draggable-items
          v-model="articls[articlTypeCurrent]"
          tag="ul"
          item-key="id"
          handle=".handle"
          ghost-class="ghost"
          @change="onUpdateArticlsOrderValues(articlTypeCurrent)"
        >
          <template #item="{ element }">
            <articls-list-item
              :articl="element"
              :order="element.order"
            />
          </template>
        </draggable-items>
      </ul>
      <div v-if="isLoggedIn">
        <router-link
          :to="{
            name: 'createArticlPage',
            query: {slug: $route.params.slug},
          }"
        >
          <a
            href
            role="button"
          >
            New Articl Here
          </a>
        </router-link>
      </div>
    </div>

    <div
      v-show="activeTab === 1"
      class="tab-content"
    >
      <notes-list :notes="notes" />
      <note-crud
        :slug="slug"
        @view-mode="updateData"
      />
    </div>
  </article>

  <article-placeholder v-else />
</template>

<script>
import { groupBy } from "lodash";
import DraggableItems from "vuedraggable";
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import articlsListItem from "@/components/layout/ArticlsListItem.vue";
import categoriesListItem from "@/components/layout/CategoriesListItem.vue";
import NoteCrud from "@/components/layout/NoteCrud.vue";
import NotesList from "@/components/layout/NotesList.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "CategoryPage",
  components: {
    ArticlePlaceholder,
    NoteCrud,
    DraggableItems,
    categoriesListItem,
    articlsListItem,
    NotesList,
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
