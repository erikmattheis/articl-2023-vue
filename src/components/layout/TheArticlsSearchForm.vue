<template>
  <form>
    <ul class="nav-tabs">
      <li :class="{ active: activeTab === 0 }">
        <a
          href
          @click.prevent="activeTab = 0"
          @keyup.enter.prevent="activeTab = 0">Search</a>
      </li>
      <li :class="{ active: activeTab === 1 }">
        <a
          href
          @click.prevent="activeTab = 1"
          @keyup.enter.prevent="activeTab = 1">More options</a>
      </li>
    </ul>
    <div
      v-show="(activeTab === 0)"
      class="active tab-content">
      <the-articls-search-filter />
    </div>
    <div
      v-show="activeTab === 1"
      class="active tab-content">
      <input type="checkbox"
        v-model="showJournalField" /> Journal
      <input-typeahead
        v-if="showJournalField"
        src="/articls/values/journal"
        :input-value="journal"
        label-value="Journal"
        query="journal"
        @typeahead-updated="onJournalChange" />
      <input type="checkbox"
        v-model="showAuthorsField" /> Author
      <input-typeahead
        v-if="showAuthorsField"
        src="/articls/values/authors"
        :input-value="authors"
        label-value="Authors"
        query="authors"
        @typeahead-updated="onAuthorsChange" />

      <input type="checkbox"
        v-model="showYearField" /> Year
      <section v-if="showYearField">
        <label for="yearComparison">Year published</label>
        <label v-if="yearsStart === Number(year)"
          for="year"
          class="horizontal"><input
            v-model="yearComparison"
            type="radio"
            value="after"
            name="yearComparison"> After</label>
        <label
          v-if="yearsStart !== Number(year)"
          :key="comparison"
          for="yearComparison"
          class="horizontal"><input
            v-for="comparison in yearComparisons"
            v-model="yearComparison"
            :key="comparison"
            type="radio"
            :value="comparison"
            name="yearComparison"> {{ comparison }} </label>
        <select
          v-model="year"
          autocomplete="off"
          @change="onYearChange">
          <option
            v-for="i in years"
            :key="i"> {{ i }} </option>
        </select>
      </section>
      <input type="checkbox"
        v-model="showTypesField" /> Type
      <div class="grid"
        v-if="showTypesField">
        <div>
          <fieldset>
            <legend>Type</legend>
            <label
              v-for="articlType in allTypes"
              :key="articlType"
              :for="articlType">
              <input
                :id="articlType"
                v-model="types"
                type="checkbox"
                :value="articlType"
                checked="checked">{{ articlType }}</label>
          </fieldset>
        </div>
      </div>
    </div>
  </form>
</template>

<script>

import { mapGetters } from "vuex";

import InputTypeahead from "@/components/ui/InputTypeahead.vue";
import TheArticlsSearchFilter from "@/components/layout/TheArticlsSearchFilter.vue";

export default {
  name: "TheArticlsSearchForm",
  components: {
    InputTypeahead,
    TheArticlsSearchFilter,
  },
  data() {
    return {
      activeTab: 0,
      allTypes: this.$store.state.articlsParams.allTypes,
      yearsStart: this.$store.state.articlsParams.yearsStart,
      yearComparisons: this.$store.state.articlsParams.yearComparisons,
      showJournalField: false,
      showAuthorsField: false,
      showTypesField: false,
      showYearField: false,
      showYearComparisonsField: false,
      year: null,
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
  },
  created() {
    this.setTitleAndDescriptionMixin({ title: "Search for articles" });
    console.log("created",);
  },
  methods: {

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

/*
* Nav tabs
*/

.grid > li {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
