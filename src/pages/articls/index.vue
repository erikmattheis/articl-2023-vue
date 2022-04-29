<template>
  <article>
    <h1>Articls {{ articls.length }}</h1>

    <form>
      <label for="title">Title</label>
      <input-typeahead
        src="/articls/title"
        @update-value="onTypeaheadHit"
        query="title"
        @blur="updateArticls"
      />

      <label for="journal">Journal</label>
      <input-typeahead
        src="/articls/journal"
        @update-value="onTypeaheadHit"
        query="journal"
        @blur="updateArticls"
      />

      <label for="author">Author</label>
      <input-typeahead
        src="/articls/authors"
        @update-value="onTypeaheadHit"
        query="author"
        @blur="updateArticls"
      />

      <label for="year">Year</label>
      <select
        multiple="true"
        v-model="year"
        name="year"
        id="year"
        autocomplete="off"
        @blur="updateArticls"
      >
        <option v-for="i in years" v-bind:key="i" @click="cclass = '#ff0000'">
          {{ i }}
        </option>
      </select>

      <label for="source">Source</label>
      <input-typeahead
        src="/articls/source"
        @update-value="onTypeaheadHit"
        query="source"
        @blur="updateArticls"
      />

      <label for="type">Link type</label>
      <select
        multiple="true"
        v-model="type"
        name="type"
        id="type"
        autocomplete="off"
        @blur="updateArticls"
      >
        <option value="Review (OA)">Review (OA)</option>
        <option value="Review (PA)">Review (PA)</option>
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

      <label for="status">Status</label>
      <select v-model="status" name="status" id="status" @blur="updateArticls">
        <option value="Publish">Publish</option>
        <option value="Draft">Draft</option>
        <option value="Pending">Pending</option>
        <option value="Trash">Trash</option>
      </select>
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
      title: "",
      journal: "",
      authors: "",
      year: [],
      buttonDisabled: false,
      totalPages: 1,
      pageNum: 1,
      yearsStart: 1944,
      years: [],
      source: "",
      type: ["Review (OA)"],
      status: "Publish",
    };
  },
  mounted() {
    //this.articls = this.getArticls();
    this.years = [
      ...Array(new Date().getUTCFullYear() - (this.yearsStart - 1)).keys(),
    ]
      .map((x) => this.yearsStart + x++)
      .reverse();
    console.log(this.years);
  },
  methods: {
    onTypeaheadHit(e) {
      this.updateArticls();
      console.log("e", e);
    },
    async updateArticls() {
      this.articls = await this.getArticls();
    },
    async getArticls() {
      console.log("updateArticls");
      const data = {
        ...(this.title && { title: this.title }),
        ...(this.journal && { journal: this.journal }),
        ...(this.authors && { authors: this.authors }),

        ...(this.year && { year: this.year }),
        ...(this.source && { source: this.source }),
        ...(this.type && { type: this.type }),
        ...(this.status && { status: this.status }),
      };
      console.log("data", data);
      return await this.$http({
        method: "GET",
        url: "/articls",
        data,
      })
        .then((result) => {
          if (result?.data) {
            console.log("result.data.results", result.data.results);
            return JSON.parse(result.data.results);
          }
          this.$store.dispatch("setError", result);
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

<style scoped lang="scss">
select {
  overflow: scroll;
}
</style>
