<template>
  <article>
    <h1>Articls</h1>
    <div class="grid">
      <form>
        <label for="title">Title</label>
        <input type="text" v-model="title" @blur="onBlur" @keyup="onKeyup" />

        <label for="journal">Journal {{ journal }}</label>
        <input-typeahead
          src="/articls/journal"
          @typeahead-updated="onTypeaheadUpdated"
          :input-value="journal"
          query="journal"
          @blur="onBlur"
          @keyup="onKeyup"
        />

        <label for="author">Author</label>
        <input-typeahead
          src="/articls/authors"
          @typeahead-updated="onTypeaheadUpdated"
          :input-value="authors"
          query="authors"
          @blur="onBlur"
          @keyup="onKeyup"
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
          @change="updateValue"
        >
          <option v-for="i in years" v-bind:key="i">
            {{ i }}
          </option>
        </select>

        <label for="source">Source</label>
        <input-typeahead
          src="/articls/source"
          @typeahead-updated="onTypeaheadUpdated"
          :input-value="source"
          query="source"
          @blur="onBlur"
          @keyup="onKeyup"
        />
        <div class="grid">
          <fieldset>
            Type
            <label>
              <input
                type="checkbox"
                value="Review (OA)"
                v-model="type"
                checked="checked"
              />Review (OA)</label
            >
            <label>
              <input
                type="checkbox"
                value="Review (PA)"
                v-model="type"
                checked="checked"
              />Review (PA)</label
            >
            <label>
              <input
                type="checkbox"
                value="Research (OA)"
                v-model="type"
                checked="checked"
              />Research (OA)</label
            >
            <label>
              <input
                type="checkbox"
                value="Research (PA)"
                v-model="type"
                checked="checked"
              />Research (PA)</label
            >
            <label>
              <input
                type="checkbox"
                value="Web"
                v-model="type"
                checked="checked"
              />Web</label
            >
            <label>
              <input
                type="checkbox"
                value="Non-medical journal articles"
                v-model="type"
                checked="checked"
              />Non-medical journal articles</label
            >
            <label>
              <input
                type="checkbox"
                value="Images"
                v-model="type"
                checked="checked"
              />Images</label
            >
            <label>
              <input
                type="checkbox"
                value="Presentations"
                v-model="type"
                checked="checked"
              />Presentations</label
            >
            <label>
              <input
                type="checkbox"
                value="Videos"
                v-model="type"
                checked="checked"
              />Videos</label
            >
          </fieldset>
          <fieldset>
            Status
            <label>
              <input
                type="checkbox"
                value="Published"
                v-model="status"
                checked="checked"
              />Published</label
            >
            <label>
              <input
                type="checkbox"
                value="Draft"
                v-model="status"
                checked="checked"
              />Draft</label
            >
            <label>
              <input
                type="checkbox"
                value="Pending"
                v-model="status"
                checked="checked"
              />Pending</label
            >
            <label>
              <input
                type="checkbox"
                value="Trash"
                v-model="status"
                checked="checked"
              />Trash</label
            >
          </fieldset>
        </div>
      </form>
      <div>
        <small>
          <ul>
            <li v-text="descriptionTitle"></li>
            <li v-text="descriptionAuthors"></li>
            <li v-text="descriptionJournal"></li>
            <li v-text="descriptionYear"></li>
            <li v-text="descriptionType"></li>
            <li v-text="descriptionStatus"></li>
          </ul>
        </small>
        <ol>
          <li
            v-for="(articl, index) in articls"
            :key="articl.id"
            :class="{ 'light-bg': index % 2 === 0 }"
          >
            {{ articl.title }}
          </li>
        </ol>
      </div>
    </div>
    <the-pagination
      v-if="totalPages > 1"
      :total-pages="totalPages"
      :current-page="page"
      @pagechanged="changePage"
      :number-of-buttons="5"
    />
  </article>
</template>

<script>
import { isEqual, debounce } from "lodash";
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
      page: 1,
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
      status: ["Published", "Draft", "Pending", "Trash"],
      paramsCurrent: {},
    };
  },
  created() {
    this.years = [
      ...Array(new Date().getUTCFullYear() - (this.yearsStart - 1)).keys(),
    ]
      .map((x) => this.yearsStart + x++)
      .reverse();
    this.onKeyup = debounce(this.onKeyup, 200);
  },
  watch: {
    page: {
      handler(newValue) {
        this.page = newValue;
        this.updateValue();
      },
    },
  },
  computed: {
    descriptionTitle() {
      return this.title ? `Title contains ${this.title}` : ``;
    },
    descriptionAuthors() {
      return this.authors ? `Authors contains ${this.authors}` : ``;
    },
    descriptionJournal() {
      return this.journal ? `Journal is ${this.journal}` : ``;
    },
    descriptionYear() {
      return this.year ? `Year is ${this.yearComparison} ${this.year}` : ``;
    },
    descriptionType() {
      return this.type.length !== 9
        ? `Type is one of ${this.type.map((x) => " " + x)}`
        : "";
    },
    descriptionStatus() {
      return this.status.length !== 4
        ? `Status is one of ${this.status.map((x) => " " + x)}`
        : "";
    },
  },
  methods: {
    onTypeaheadUpdated(e) {
      console.log("onTypeaheadUpdated e.value", e.value);
      console.log("onTypeaheadUpdated e.field", e.field);
      this[e.field] = e.value;
      this.updateValue(this);
    },
    onKeyup() {
      this.updateValue(this);
    },
    onBlur(e) {
      console.log("onBlur e.value", e.value);
      this.updateValue(this);
    },
    async updateValue(obj) {
      const params = this.assembleParams(obj);
      if (params) {
        const result = await this.getArticls(params);
        this.articls = result.results;
        this.totalPages = result.totalPages;
        //this.page = result.page;
      }
    },
    async getArticls(params) {
      console.log("getArticls", params);
      return await this.$http({
        method: "GET",
        url: "/articls",
        params,
      })
        .then((result) => {
          if (result?.data) {
            return result.data;
          }
          this.$store.dispatch("setError", result);
        })
        .catch((error) => this.$store.dispatch("setError", error));
    },
    assembleParams(obj) {
      const params = {
        ...(obj.title && { title: obj.title }),
        ...(obj.journal && { journal: obj.journal }),
        ...(obj.authors && { authors: obj.authors }),
        ...(obj.yearComparison && { yearComparison: obj.yearComparison }),
        ...(obj.year && { year: obj.year }),
        ...(obj.source && { source: obj.source }),
        ...(obj.type?.length && obj.type.length !== 9 && { type: obj.type }),
        ...(obj.status?.length &&
          obj.status.length !== 4 && { status: obj.status }),
        ...(obj.page && { page: obj.page }),
        ...(obj.limit && { limit: obj.limit }),
      };
      if (!isEqual(params, this.paramsCurrent)) {
        this.paramsCurrent = structuredClone(params);
        return params;
      }
      return false;
    },
    changePage(page) {
      this.page = page;
      this.updateValue();
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
ol {
  padding: 1rem !important;
  list-style-type: decimal !important;
}
.light-bg {
  background-color: #20303d;
}
</style>
