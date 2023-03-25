<template>
  <article>
    <h1>Search Articls</h1>
    <div class="grid">
      <the-articls-search-form />
      <div>
        <the-articls-search-params />
      </div>
    </div>
    <articls-list />
  </article>
</template>

<script>
import TheArticlsSearchForm from "@/components/layout/TheArticlsSearchForm.vue";
import TheArticlsSearchParams from "@/components/layout/TheArticlsSearchParams.vue";

export default {
  name: "ArticlsSearch",
  components: {
    TheArticlsSearchForm,
    TheArticlsSearchParams,
  },
};
</script>
