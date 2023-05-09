<template>
  <form>
    <label for="q">Search <input
        id="q"
        v-model="q"
        type="text"></label>

    <section>
      <div class="grid"
        v-for="result in results"
        :key="result.id">
        <articls-list-item
          :articl="result"
          :order="result.order" />
        <h3><span v-html="highlightMatchedText(result.title)"></span><br />
          <span v-html="highlightMatchedText(result.journal)"></span>
        </h3>
        <span v-html="highlightMatchedText(result.authors)"></span>
        {{ result.score }}
      </div>
    </section>
    <!--
    <button @click.prevent="submitForm">Search</button> <vue-feather type="filter"
      size="0.7rem" />
      -->
  </form>
</template>

<script>

import { mapGetters } from "vuex";
import { debounce } from "lodash";

import axiosInstance from "@/services/axiosService";
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";

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
      showJournalField: false,
      showAuthorsField: false,
      showTypesField: false,
      showYearField: false,
      showYearComparisonsField: false,
      year: null,
      q: "",
    };
  },
  computed: {
    queryUC: (val) => val[0].toUpperCase() + val.substring(1),
    ...mapGetters({
      years: "articlsParams/years",
    }),
    text: {
      get() {
        return this.$store.state.articlsParams.text;
      },
      set(value) {
        this.$store.dispatch("articlsParams/text", value);
      },
    },
    title: {
      get() {
        return this.$store.state.articlsParams.title;
      },
      set(value) {
        this.$store.dispatch("articlsParams/title", value);
      },
    },
    journal: {
      get() {
        return this.$store.state.articlsParams.journal;
      },
      set(value) {
        this.$store.dispatch("articlsParams/journal", value);
      },
    },
    authors: {
      get() {
        return this.$store.state.articlsParams.authors;
      },
      set(value) {
        this.$store.dispatch("articlsParams/authors", value);
      },
    },
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
        this.searchAll(newValue);
      },
    },
  },
  mounted() {
    this.setTitleAndDescriptionMixin({ title: "Search for articles" });
    this.searchAll = this.debounce(this.searchAll, 200);
  },
  methods: {
    async searchAll(q) {
      if (q.length < 2) {
        return;
      }

      const response = await axiosInstance.get("/articls/search", {
        params: {
          q,
        },
      });

      this.results = response.data;
    },
    onTypesChange(event) {
      this.$store.dispatch("articlsParams/types", this.types);
      console.log("onTypesChange", event);
    },
    onYearChange(event) {
      console.log("onYearChange", event.target.value);
      this.$store.dispatch("articlsParams/year", event.target.value);
    },
    onJournalChange(event) {
      this.$store.dispatch("articlsParams/journal", event.value);
    },
    onAuthorsChange(event) {
      this.$store.dispatch("articlsParams/authors", event.value);
    },
    onTitleChange(event) {
      this.$store.dispatch("articlsParams/title", event.target.value);
    },
    onYearComparisonChange(event) {
      console.log("onYearComparisonChange", event.target.value);
      this.$store.dispatch("articlsParams/yearComparison", event.target.value);
    },
    debounce,

  }
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

/*
* Nav tabs
*/

.grid > li {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
