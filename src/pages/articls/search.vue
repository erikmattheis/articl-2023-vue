<template>
  <article>
    <h1>Search Articls</h1>
    <div class="grid">
      <the-articls-search-form />
    </div>
    <articls-list />
  </article>
</template>

<script>
import TheArticlsSearchForm from "@/components/layout/TheArticlsSearchForm.vue";
import ArticlsList from "@/components/layout/ArticlsList.vue";

export default {
  name: "ArticlsSearch",
  components: {
    TheArticlsSearchForm,
    ArticlsList
  },
};
</script>
