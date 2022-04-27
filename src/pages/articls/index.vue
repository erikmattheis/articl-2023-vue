<template>
  <article>
    <h1>Articls</h1>

    <form>
      <label for="author">Author</label>
      <input-typeahead
        src="/articls/authors"
        @update-value="onTypeaheadHit"
        query="author"
      />

      <label for="typeaheadQuery">Title</label>
      <input-typeahead
        src="/articls/title"
        @update-value="onTypeaheadHit"
        query="title"
      />

      <label for="journal">Journals</label>
      <input-typeahead
        src="/articls/journal"
        @update-value="onTypeaheadHit"
        query="journal"
      />

      <select
        multiple="true"
        v-model="year"
        name="year"
        id="year"
        autocomplete="off"
      >
        <option value="i" v-bind="year" v-for="year in years" v-bind:key="year">
          {{ year }}
        </option>
      </select>

      <label for="source">Source</label>
      <input-typeahead
        src="/articls/source"
        @update-value="onTypeaheadHit"
        query="source"
      />

      <label for="type">Link type</label>
      <select
        multiple="true"
        v-model="type"
        name="type"
        id="type"
        autocomplete="off"
      >
        <option value="Review (OA)">Review (OA)</option>
        <option value="Review (OA)">Review (PA)</option>
        <option value="Research (OA)">Research (OA)</option>
        <option value="Research (PA)">Research (PA)</option>
        <option value="Web">Web</option>
        <option value="on-medical journal articles">
          Non-medical journal articles
        </option>
        <option value="Images">Images</option>
        <option value="Presentations">Presentations</option>
        <option value="Videos">Videos</option>
        <option value="Podcast">Podcast</option>
      </select>

      <label for="typeaheadQuery">Status</label>
      <input-typeahead
        src="/articls/status"
        @update-value="onTypeaheadHit"
        query="status"
      />
    </form>

    <ul>
      <li v-for="articl in articls" :key="articl.id">{{ articl.title }}</li>
    </ul>

    <the-pagination
      v-if="totalPages > 1"
      :total-pages="totalPages"
      :current-page="pageNum"
      @pagechanged="changePage"
      :number-of-buttons="5"
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
import InputTypeahead from "@/components/ui/InputTypeahead.vue";
export default {
  name: "listArticlsPage",
  components: { ThePagination, InputTypeahead },
  data() {
    return {
      articls: [],
      buttonDisabled: false,
      totalPages: 1,
      pageNum: 1,
      years: 0,
    };
  },
  mounted() {
    this.articls = this.getArticls();
    const now = new Date().getUTCFullYear();
    this.years = Array(now - (now - 82))
      .fill("")
      .map((v, idx) => now - idx);
  },
  methods: {
    onTypeaheadHit(e) {
      console.log("e", e);
    },
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
select {
  overflow: scroll;
}
.containerClass {
  background-color: red;
}
.success {
  border: 8px solid green;
  background-color: honeydew;
}
</style>
