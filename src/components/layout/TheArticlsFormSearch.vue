<template>
  <form>
    <details open>
      <summary role="button">Search text</summary>
      <label for="title">Title</label>
      <input type="text" :value="title" @keyup="onTitleChange" />

      <label for="journal">Journal</label>
      <input-typeahead
        src="/articls/journal"
        @typeahead-updated="onTypeaheadOptionClick"
        :input-value="journal"
        query="journal"
        @keyup="onKeyup"
      />

      <label for="author">Author</label>
      <input-typeahead
        src="/articls/authors"
        @typeahead-updated="onTypeaheadOptionClick"
        :input-value="authors"
        query="authors"
        x
        @keyup="onKeyup"
      />
    </details>
    <details>
      <summary role="button">Advanced</summary>
      <label><h3>Year published</h3></label>

      <label
        class="horizontal"
        v-for="comparison in comparisons"
        :key="comparison"
      >
        <input
          name="yearComparison"
          type="radio"
          :value="comparison"
          v-model="yearComparison"
        />
        {{ comparison }}
      </label>

      <label for="year">Year</label>
      <select
        v-model="year"
        name="year"
        id="year"
        autocomplete="off"
        @change="updateValues"
      >
        <option v-for="i in years" v-bind:key="i">
          {{ i }}
        </option>
      </select>

      <div class="grid">
        <div>
          <fieldset>
            Type
            <label v-for="(type, index) in allTypes" :key="index">
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
            <label v-for="(status, index) in allStatuses" :key="index">
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
    </details>
  </form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { debounce } from "lodash";
import InputTypeahead from "@/components/ui/InputTypeahead.vue";
import { highlightedSubstring, noCaseIndexOf } from "@/services/stringsService";
import "v3-infinite-loading/lib/style.css";

export default {
  name: "TheArticlsFormSearch",
  components: { InputTypeahead },
  emits: ["updateParams"],
  data() {
    return {
      advanced: null,
      titleInputValue: this.title,
    };
  },
  computed: {
    ...mapState({
      title: (state) => state.articlsParams.title,
    }),
    ...mapGetters({
      allStatuses: "articlsParams/allStatuses",
      allTypes: "articlsParams/allTypes",
      journal: "articlsParams/journal",
      authors: "articlsParams/authors",
      comparisons: "articlsParams/comparisons",
      year: "articlsParams/year",
      yearComparison: "articlsParams/yearComparison",
      years: "articlsParams/years",
      types: ["articlsParams/types"],
      statuses: "articlsParams/statuses",
      params: "articlsParams/params",
    }),
  },

  created() {
    this.highlightedSubstring = highlightedSubstring;
    this.noCaseIndexOf = noCaseIndexOf;
    this.onKeyup = debounce(this.onKeyup, 200);
  },
  watch: {
    types: {
      handler() {
        this.updateValues();
      },
      deep: true,
    },
    statuses: {
      handler() {
        this.updateValues();
      },
      deep: true,
    },
  },
  methods: {
    onTypeaheadOptionClick(e) {
      this[e.field] = e.value;
      this.updateValues();
    },
    onTitleChange(event) {
      this.$store.dispatch("articlsParams/setTitle", event.target.value);
    },
    onKeyup() {
      this.updateValues();
    },

    toListWithOptionalConjuction(arr, conj = "") {
      return (
        arr.slice(0, arr.length - 1).join(", ") +
        (arr.length > 1 ? " " + conj + " " : "") +
        arr[arr.length - 1]
      );
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
#app > main > article > div > div > small > ul > li > a {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  color: red !important;
}
.light-bg {
  background-color: #20303d;
}
strong:not([class="not-strong"]) {
  background-color: rgb(181, 228, 133);
  color: black;
  padding: 0.2rem 0.1rem;
}
</style>
