<template>
  <article>
    <h1>Articls {{ articls?.length }}</h1>

    <form>
      <label for="title">Title</label>
      <input-typeahead
        src="/articls/title"
        @update-value="onTypeaheadHit"
        query="title"
        @blur="updateArticls"
        @keyup="updateArticls"
      />

      <label for="journal">Journal</label>
      <input-typeahead
        src="/articls/journal"
        @update-value="onTypeaheadHit"
        query="journal"
        @blur="updateArticls"
        @keyup="updateArticls"
      />

      <label for="author">Author</label>
      <input-typeahead
        src="/articls/authors"
        @update-value="onTypeaheadHit"
        query="author"
        @blur="updateArticls"
        @keyup="updateArticls"
      />

      <label>Year published</label>

      <label class="horizontal" for="after">
        <input
          name="yearComparison"
          type="radio"
          id="after"
          value="after"
          v-model="yearComparison"
          checked="checked"
        />
        after
      </label>
      <label class="horizontal" for="before">
        <input
          name="yearComparison"
          type="radio"
          id="before"
          value="before"
          v-model="yearComparison"
        />
        before
      </label>
      <label for="exactly" class="horizontal"
        ><input
          name="yearComparison"
          type="radio"
          id="exactly"
          value="exactly"
          v-model="yearComparison"
        />
        exactly
      </label>

      <label for="year">Year</label>
      <select
        v-model="year"
        name="year"
        id="year"
        autocomplete="off"
        @change="updateArticls"
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
        @keyup="updateArticls"
      />

      <fieldset>
        Type
        <label for="reviewOpenAccess">
          <input
            type="checkbox"
            id="reviewOpenAccess"
            value="Review (OA)"
            v-model="type"
            checked="checked"
          />Review (OA)</label
        >
        <label for="reviewPaidAccess">
          <input
            type="checkbox"
            id="reviewPaidAccess"
            value="Review (PA)"
            v-model="type"
            checked="checked"
          />Review (PA)</label
        >
        <label for="researchOpenAccess">
          <input
            type="checkbox"
            id="researchOpenAccess"
            value="Research (OA)"
            v-model="type"
            checked="checked"
          />Research (OA)</label
        >
        <label for="researchPaidAccess">
          <input
            type="checkbox"
            id="researchPaidAccess"
            value="Research (PA)"
            v-model="type"
            checked="checked"
          />Research (PA)</label
        >
        <label for="web">
          <input
            type="checkbox"
            id="web"
            value="Web"
            v-model="type"
            checked="checked"
          />Web</label
        >
        <label for="nonMedicalJournal">
          <input
            type="checkbox"
            id="nonMedicalJournal"
            value="Non-medical journal articles"
            v-model="type"
            checked="checked"
          />Non-medical journal articles</label
        >
        <label for="images">
          <input
            type="checkbox"
            id="images"
            value="Images"
            v-model="type"
            checked="checked"
          />Images</label
        >
        <label for="presentations">
          <input
            type="checkbox"
            id="presentations"
            value="Presentations"
            v-model="type"
            checked="checked"
          />Presentations</label
        >
        <label for="videos">
          <input
            type="checkbox"
            id="videos"
            value="Videos"
            v-model="type"
            checked="checked"
          />Videos</label
        >
      </fieldset>
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
import { isEqual } from "lodash";
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
      year: 1944,
      yearComparison: "after",
      buttonDisabled: false,
      totalPages: 1,
      pageNum: 1,
      yearsStart: 1944,
      years: [],
      source: "",
      type: [
        "Review (OA)",
        "Review (PA)",
        "Research (OA)",
        "Research (PA)",
        "Web",
        "Non-medical journal articles",
        "Images",
        "Presentations",
        "Videos",
      ],
      status: "Publish",
      paramsCurrent: {},
    };
  },
  mounted() {
    //this.articls = this.getArticls();
    this.years = [
      ...Array(new Date().getUTCFullYear() - (this.yearsStart - 1)).keys(),
    ]
      .map((x) => this.yearsStart + x++)
      .reverse();
  },
  methods: {
    onTypeaheadHit() {
      this.updateArticls();
    },
    async updateArticls() {
      console.log("updateArticls");
      const params = this.assembleParams(this);
      if (params) {
        this.articls = await this.getArticls(params);
      }
    },
    async getArticls(params) {
      console.log("params", params);
      return await this.$http({
        method: "GET",
        url: "/articls",
        params,
      })
        .then((result) => {
          if (result?.data) {
            return result.data.results;
          }
          this.$store.dispatch("setError", result);
        })
        .catch((error) => this.$store.dispatch("setError", error));
    },
    assembleParams(obj) {
      console.log("yearComparison", this.yearComparison);
      const params = {
        ...(obj.title && { title: obj.title }),
        ...(obj.journal && { journal: obj.journal }),
        ...(obj.authors && { authors: obj.authors }),
        ...(obj.yearComparison && { yearComparison: obj.yearComparison }),
        ...(obj.year && { year: obj.year }),
        ...(obj.source && { source: obj.source }),
        ...(obj.type?.length && obj.type.length !== 9 && { type: obj.type }),
        ...(obj.status && { status: obj.status }),
      };
      if (!isEqual(params, this.paramsCurrent)) {
        this.paramsCurrent = structuredClone(params);
        console.log(params);
        return params;
      }
      return false;
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
.horizontal {
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
