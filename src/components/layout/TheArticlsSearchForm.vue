<template>
  <form>
    <div>
      <label for="q">Search <input
          id="q"
          v-model="q"
          type="text"></label>
    </div>

    <div class="flex-parent">
      <label
        for="searchTitle"
        v-for="field in allSearchFields  "
        :key="field">
        <input
          :id="field"
          type="checkbox"
          :name="field"
          :checked="searchFields.includes(field)"
          :aria-checked="searchFields.includes(field)"
          role="switch"
          class="checkbox-label"
          @click="toggle(field)"> {{ field }}</label>
    </div>

  </form>
  <section>
    <div
      v-for="result in results"
      :key="result.id">
      <articls-list-item
        :articl="result"
        :q="q"
        :order="result.order" />
    </div>
  </section>
  <!--
    <button @click.prevent="submitForm">Search</button> <vue-feather type="filter"
      size="0.7rem" />
      -->
</template>

<script>

import { mapGetters } from "vuex";
import { debounce } from "lodash";

import axiosInstance from "@/services/axiosService";
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";
import { highlightMatchedText } from "@/services/stringsService";

export default {
  name: "TheArticlsSearchForm",
  components: {
    ArticlsListItem
  },
  data() {
    return {
      results: [],
      allTypes: this.$store.state.articlsParams.allTypes,
      yearsStart: this.$store.state.articlsParams.yearsStart,
      yearComparisons: this.$store.state.articlsParams.yearComparisons,
      year: null,
      q: "",
      allSearchFields: ["title", "author", "journal", "institution", "abstract"],
      searchFields: ["title", "author", "journal", "institution", "abstract"],
    };
  },
  computed: {
    ...mapGetters({
      years: "articlsParams/years",
    }),
    yearComparison: {
      get() {
        return this.$store.state.articlsParams.yearComparison;
      },
      set(value) {
        this.$store.dispatch("articlsParams/yearComparison", value);
      },
    },
    types: {
      get() {
        return this.$store.state.articlsParams.types;
      },
      set(value) {
        this.$store.dispatch("articlsParams/types", value);
      },
    },
    years: {
      get() {
        return this.$store.state.articlsParams.types;
      },
      set(value) {
        this.$store.dispatch("articlsParams/types", value);
      },
    },
  },
  watch: {
    yearComparison: {
      handler(newValue) {
        this.year = newValue;
      },
    },
    q: {
      handler(newValue) {
        this.searchArticls(newValue, this.searchFields);
      },
    },
    searchFields: {
      handler(newValue) {
        this.searchArticls(this.q, newValue);
      },
      deep: true,
    },
  },
  mounted() {
    this.setTitleAndDescriptionMixin({ title: "Search for articles" });
    this.searchArticls = debounce(this.searchArticls, 200);
    this.q = this.$route.query.q || "";
    console.log("searchFields", this.$route.query.searchFields);
    console.log("searchFields2", this.$route.query.searchFields?.length);
    if (this.$route.query.searchFields?.length) {
      this.searchFields = this.$route.query.searchFields.split(",");
    }

  },
  methods: {

    async searchArticls(q, searchFields) {
      this.$router.push({
        path: this.$route.path,
        query: { q, searchFields: searchFields.join(",") },
      });

      if (q.length < 2) {
        return;
      }

      const response = await axiosInstance.get("/articls/search", {
        params: {
          q, searchFields: searchFields.join(",")
        },
      });
      this.results = this.highlight(response.data, q);
    },
    highlight(articl, q) {
      for (const key in articl) {
        if (Object.prototype.hasOwnProperty.call(articl, key)) {
          const value = articl[key];
          if (key !== "q") {
            articl[key] = this.highlightMatchedText(value, q);
          }
        }
      }
      return articl;
    },
    toggle(field) {
      if (this.searchFields.includes(field)) {
        this.searchFields = this.searchFields.filter((item) => item !== field);
      } else {
        this.searchFields.push(field);
      }
      this.filterArticls(this.searchFields);
    },
    filterArticls(searchFields) {
      this.results.filter((articl) => { return searchFields.includes(articl.type) });
    },
    debounce,
    highlightMatchedText,
  },

};
</script>

<style scoped>
.flex-parent {
  display: flex;
}

.flex-parent > * {
  width: min-width;
  margin-right: 0.5rem;
}

.checkbox-label {
  display: inline-block;
  margin-right: 0.5rem;
}

.checkbox-label::not(:last-child) {
  margin-right: 0.5rem;
}
</style>
