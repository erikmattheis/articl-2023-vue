<template>
  <article>
    <h1>Articls</h1>

    <ul>
      <li v-for="articl in articls" :key="articl.id">{{ articl.title }}</li>
    </ul>
    pageNum:{{ pageNum }}
    <the-pagination
      :total-pages="totalPages"
      :current-page="pageNum"
      @pagechanged="changePage"
    />
    <button
      type="submit"
      id="Create"
      :aria-busy="buttonDisabled"
      @click.prevent="
        $router.push({
          name: 'createaArticlPage',
          params: { categorySlug: '0' },
        })
      "
    >
      <span v-if="!buttonDisabled">Create articl</span>
    </button>
  </article>
</template>

<script>
import ThePagination from "@/components/ui/ThePagination.vue";
export default {
  name: "listArticlsPage",
  components: { ThePagination },
  data() {
    return {
      articls: [],
      buttonDisabled: false,
      totalPages: 100,
      pageNum: 7,
    };
  },
  mounted() {
    this.articls = this.getArticls();
  },
  methods: {
    getArticls() {
      return this.$http({
        method: "GET",
        url: "/articls",
      })
        .then((result) => {
          if (result?.data) {
            return result.data;
          }
          return this.$store.dispatch("setError", result);
        })
        .catch((error) => this.$store.dispatch("setError", error));
    },
    changePage(page) {
      console.log("page", page);
      this.pageNum = page;
    },
  },
};
</script>

<style scoped>
.containerClass {
  background-color: red;
}
.success {
  border: 8px solid green;
  background-color: honeydew;
}
</style>
