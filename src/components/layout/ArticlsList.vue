<template>
  <ol>
    <li
      class="grid"
      v-for="(articl, index) in articls"
      :key="articl.id"
      :class="{ 'light-bg': index % 2 === 0 }"
    >
      <draggable-element :articls="articls" item-key="articl.id">
        <template #item> <articls-list-item articl="articl" /></template
      ></draggable-element>
    </li>
  </ol>
</template>

<script>
import { mapGetters } from "vuex";
import DraggableElement from "vuedraggable";
import { isEqual } from "lodash";
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";

export default {
  name: "ArticlsList",
  components: { DraggableElement, ArticlsListItem },
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
  },
};
</script>

<style scoped>
.light-bg {
  background-color: #20303d;
}
</style>
