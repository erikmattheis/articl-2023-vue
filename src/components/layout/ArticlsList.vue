<template>
  <draggable-items tag="ol" v-model="articls" item-key="id">
    <template #item="{ element }"
      ><li>
        <articls-list-item :articl="element"></articls-list-item>
      </li>
    </template>
  </draggable-items>
</template>

<script>
import { mapGetters } from "vuex";
import DraggableItems from "vuedraggable";
import { isEqual } from "lodash";
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";

export default {
  name: "ArticlsList",
  components: { DraggableItems, ArticlsListItem },
  data() {
    return { articls: [], isLoading: false };
  },
  watch: {
    params: {
      handler(newValue) {
        console.log("watch params handler", newValue);
        this.updateValues(newValue);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      params: "articlsParams/params",
    }),
  },
  methods: {
    async updateValues(params) {
      if (isEqual(params, {})) {
        this.articls = [];
        this.totalResults = "--";
        return;
      }

      if (params) {
        const result = await this.getArticls(params);
        if (Number(result.page) === 1 || result?.results?.length === 0) {
          this.articls = [];
          this.totalResults = "--";
        }

        this.articls = this.articls.concat(result.results);
        this.totalPages = result.totalPages;
        this.limit = result.limit;
        this.totalResults = result.totalResults;
      } else {
        return;
      }
    },
    async getArticls(params) {
      this.isLoading = true;
      const result = await this.$http({
        method: "GET",
        url: "/articls",
        params,
      });

      if (result?.data) {
        return result.data;
      }

      this.isLoading = false;
    },
    getComponentData() {
      return {
        articls: this.articls,
      };
    },
  },
};
</script>

<style scoped>
.light-bg {
  background-color: #20303d;
}
</style>
