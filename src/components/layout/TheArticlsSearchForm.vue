<template>
  <form>
    <!---
    <details open>
      <summary role="button">Weighted search</summary>
      <label for="text">Text</label>
      <input type="text" id="text" v-model="text" />
    </details>
-->
    <ul class="grid nav-tabs">
      <li :class="{ active: activeTab === 0 }">
        <a href @click.prevent="activeTab = 0">Search</a>
      </li>
      <li :class="{ active: activeTab === 1 }">
        <a href @click.prevent="activeTab = 1">More options</a>
      </li>
    </ul>
    <div v-show="activeTab === 0" class="active tab-content">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title" />
    </div>
    <div v-show="activeTab === 1" class="active tab-content">
      <label for="journal">Journal</label>
      <input-typeahead
        src="/articls/journal"
        @typeahead-updated="onJournalChange"
        :input-value="journal"
        query="journal"
      />

      <label for="author">Author</label>
      <input-typeahead
        src="/articls/authors"
        @typeahead-updated="onAuthorsChange"
        :input-value="authors"
        query="authors"
      />

      <summary role="button">Advanced</summary>
      <label><h3>Year published</h3></label>
      <h3 v-if="Number(year) === yearsStart">After</h3>
      <label
        v-else
        class="horizontal"
        v-for="comparison in yearComparisons"
        :key="comparison"
        ><input
          type="radio"
          v-model="yearComparison"
          :value="comparison"
          name="yearComparison"
        />
        {{ comparison }}
      </label>
      <label for="year">Year</label>
      <select v-model="year" autocomplete="off" @change="onYearChange">
        <option v-for="i in years" :key="i">
          {{ i }}
        </option>
      </select>

      <div class="grid">
        <div>
          <fieldset>
            Type
            <label v-for="type in allTypes" :key="type">
              <input
                type="checkbox"
                :value="type"
                v-model="types"
                checked="checked"
              />{{ type }}</label
            >
          </fieldset>
        </div>
        <div>
          <fieldset>
            Status
            <label v-for="status in allStatuses" :key="status">
              <input
                type="checkbox"
                :value="status"
                v-model="statuses"
                checked="checked"
              />{{ status }}</label
            >
          </fieldset>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "lodash";
import InputTypeahead from "@/components/ui/InputTypeahead.vue";

export default {
  name: "theArticlsFormSearch",
  components: { InputTypeahead },
  data() {
    return {
      activeTab: 0,
      allStatuses: this.$store.state.articlsParams.allStatuses,
      allTypes: this.$store.state.articlsParams.allTypes,
      yearsStart: this.$store.state.articlsParams.yearsStart,
      yearComparisons: this.$store.state.articlsParams.yearComparisons,
    };
  },
  computed: {
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
    year: {
      get() {
        return this.$store.state.articlsParams.year;
      },
      set(value) {
        if (Number(value) === Number(this.yearsStart)) {
          this.$store.dispatch("articlsParams/yearComparison", "after");
        }
        this.$store.dispatch("articlsParams/year", value);
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
    statuses: {
      get() {
        return this.$store.state.articlsParams.statuses;
      },
      set(value) {
        this.$store.dispatch("articlsParams/statuses", value);
      },
    },
  },
  created() {
    this.$store.dispatch(
      "articlsParams/statuses",
      this.$store.state.articlsParams.allStatuses
    );
    this.$store.dispatch(
      "articlsParams/types",
      this.$store.state.articlsParams.allTypes
    );
    this.onTitleChange = debounce(this.onTitleChange, 200);
  },
  watch: {
    yearComparison: {
      handler(newValue) {
        console.log("watch yearComparison handler", newValue);
        this.$store.dispatch("articlsParams/yearComparison", newValue);
      },
      deep: true,
    },
  },
  methods: {
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
    /*
    onTypesChange(event) {
      console.log("event.target.value", event.target.value);
      this.$store.dispatch("articlsParams/types", event.target.value);
    },
    */
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
  height: 20rem;
  overflow: scroll;
}
ol.scroll {
  height: 10rem;
  overflow: scroll;
}
ol li {
  margin-bottom: 1rem;
  padding: 0.4rem;
}
</style>
