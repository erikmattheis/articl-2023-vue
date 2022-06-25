<template>
  <div>
    <draggable-items
      v-if="!isLoading"
      v-model="articls"
      tag="ul"
      item-key="id"
      handle=".handle"
      ghost-class="ghost"
      @change="onUpdateOrderValues"
    >
      <template #item="{ element }">
        <li>
          <articls-list-item
            :articl="element"
            order="0"
          />
        </li>
      </template>
    </draggable-items>
    <transition
      name="fade"
      mode="out-in"
    >
      <article-placeholder v-if="isLoading" />
    </transition>
  </div>
</template>

<script>
import { isEqual } from "lodash";
import DraggableItems from "vuedraggable";
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";

export default {
  name: "ArticlsList",
  components: {
    DraggableItems,
    ArticlePlaceholder,
    ArticlsListItem,
  },
  data: () => {

    return {
      articls: [],
      isLoading: false,
    };

  },
  computed: {
    ...mapGetters({
      params: "articlsParams/params",
    }),
  },
  watch: {
    params: {
      handler(newValue) {

        console.log("params", newValue);
        this.updateValues(newValue);

      },
      deep: true,
    },
  },
  methods: {
    updateOrderValues() {

      try {

        this.articls.forEach((obj, index) => {

          const objValue = obj;

          objValue.order = index;

        });

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },
    async saveOrderValues() {

      try {

        const order = this.articls.map((obj) => {

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
    onUpdateOrderValues() {

      this.updateOrderValues();

      this.saveOrderValues();

    },
    async updateValues(params) {

      try {

        if (isEqual(params, {
        })) {

          this.articls = [];

          this.totalResults = "--";

          return;

        }

        if (params) {

          this.isLoading = true;

          const result = await this.getArticls(params);

          this.isLoading = false;

          if (Number(result.page) === 1 || result.results?.length === 0) {

            this.articls = [];

            this.totalResults = "--";

          }

          this.articls = this.articls.concat(result.results);

          this.totalPages = result.totalPages;

          this.limit = result.limit;

          this.totalResults = result.totalResults;

        }

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },
    async saveOrder(order) {

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
    async getArticls(params) {

      this.isLoading = true;

      const result = await this.$http({
        method: "GET",
        url: "/articls",
        params,
      });

      this.isLoading = false;

      return result.data;

    },
  },
};
</script>
