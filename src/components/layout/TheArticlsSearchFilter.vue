<template>
  <form>
    <label for="title">Title <input
        id="title"
        v-model="title"
        type="text"></label>
    <label for="title">Author <input
        id="author"
        v-model="author"
        type="text"></label>
    <label for="title">Journal <input
        id="author"
        v-model="author"
        type="text"></label>

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

    <vue-feather type="filter"
      size="0.7rem" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import VueFeather from "vue-feather";

export default {
  name: "TheArticlsSearchForm",
  components: {
    VueFeather,
  },
  data() {
    return {
      s: undefined,
      filters: ["Author", "Journal", "Year", "Resource Type"],
      yearsStart: this.$store.state.articlsParams.yearsStart,
      yearComparisons: this.$store.state.articlsParams.yearComparisons,
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
  },
  watch: {
    yearComparison: {
      handler(newValue) {
        this.$store.dispatch("articlsParams/yearComparison", newValue);
      },
    },
  },
};
</script>

<style>
select {
  overflow: scroll;
}

.horizontal {
  display: inline-block;
  margin-right: 0.5rem;
}

.input-container {
  display: flex;
  width: 250px;
  border: 1px solid #a9a9a9;
  justify-content: space-between;
}

.input-container input:focus,
.input-container input:active {
  outline: none;
}

.input-container input {
  border: none;
  padding: 0;
  margin-bottom: 0;
}

button {
  margin-bottom: 0;
  padding: 0.3rem;
  width: min-content;

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

