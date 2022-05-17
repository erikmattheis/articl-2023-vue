<template>
  <form>
    <details open>
      <summary role="button">Search text</summary>
      <label for="title">Title</label>
      <input type="text" v-model="title" @blur="onBlur" @keyup="onKeyup" />

      <label for="journal">Journal</label>
      <input-typeahead
        src="/articls/journal"
        @typeahead-updated="onTypeaheadOptionClick"
        :input-value="journal"
        query="journal"
        @blur="onBlur"
        @keyup="onKeyup"
      />

      <label for="author">Author</label>
      <input-typeahead
        src="/articls/authors"
        @typeahead-updated="onTypeaheadOptionClick"
        :input-value="authors"
        query="authors"
        @blur="onBlur"
        @keyup="onKeyup"
      />
    </details>
    <details>
      <summary role="button">Advanced</summary>
      <label><h3>Year published</h3></label>

      <label
        class="horizontal"
        v-for="(comparison, index) in comparisons"
        :key="index"
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
import { isEqual, debounce } from "lodash";
import InputTypeahead from "@/components/ui/InputTypeahead.vue";
import { highlightedSubstring, noCaseIndexOf } from "@/services/stringsService";
import "v3-infinite-loading/lib/style.css";

export default {
  name: "listArticlsPage",
  components: { InputTypeahead },
  emits: ["updateParams"],
  data() {
    return {
      advanced: null,
      allStatuses: [],
      allTypes: [],
      articls: [],
      authors: "",
      comparisons: ["after", "before", "exactly"],
      isLoading: false,
      journal: "",
      limit: 5,
      page: 0,
      paramsCurrent: {},
      source: "",
      statuses: ["Published", "Draft", "Pending", "Trash"],
      title: "",
      totalPages: 1,
      totalResults: "--",
      types: [
        "Review (OA)",
        "Review (PA)",
        "Research (OA)",
        "Research (PA)",
        "Images",
        "Non-medical journal articles",
        "Presentations",
        "Videos",
        "Web",
      ],
      year: 0,
      yearComparison: "after",
      years: [],
      yearsStart: 1944,
    };
  },
  created() {
    let observerOptions = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    var observer = new IntersectionObserver(observerCallback, observerOptions);

    function observerCallback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("intersect!");
        }
      });
    }

    document.querySelectorAll(".scroll-spy").forEach((i) => {
      if (i) {
        observer.observe(i);
      }
    });
    this.years = [
      ...Array(new Date().getUTCFullYear() - (this.yearsStart - 1)).keys(),
    ]
      .map((x) => this.yearsStart + x++)
      .reverse();
    this.year = this.yearsStart;
    this.allTypes = this.types.slice();
    this.allStatuses = this.statuses.slice();
    this.highlightedSubstring = highlightedSubstring;
    this.noCaseIndexOf = noCaseIndexOf;
    this.onKeyup = debounce(this.onKeyup, 200);
  },
  watch: {
    types: {
      handler() {
        this.updateValues(this);
      },
      deep: true,
    },
    statuses: {
      handler() {
        this.updateValues(this);
      },
      deep: true,
    },
  },
  methods: {
    resetValues(arrName) {
      switch (arrName) {
        case "statuses": {
          this.statuses = this.allStatuses;
          break;
        }
        case "types": {
          this.types = this.allTypes;
          break;
        }
      }
      this.updateValues(this);
    },
    clearValue(varName) {
      this[varName] = null;
      this.updateValues(this);
    },
    onTypeaheadOptionClick(e) {
      this[e.field] = e.value;
      this.updateValues(this);
    },
    onKeyup() {
      this.updateValues(this);
    },
    onBlur() {
      this.updateValues(this);
    },
    async updateValues(obj) {
      console.log("updateValues in child");
      const params = this.assembleParams(obj);

      if (params) {
        console.log("emitting event from child");
        this.$emit("updateParams", params);
      } else {
        console.log("no params in child");
        return;
      }
    },
    assembleParams(obj, force = false) {
      const params = {
        ...(obj?.title && { title: obj.title }),
        ...(obj?.journal && { journal: obj.journal }),
        ...(obj?.authors && { authors: obj.authors }),
        ...(obj?.yearComparison &&
          Number(obj?.year) !== 1944 && { yearComparison: obj.yearComparison }),
        ...(obj?.year && Number(obj.year) !== 1944 && { year: obj.year }),
        ...(obj?.types &&
          obj.types.length !== 9 && { types: obj.types.join(",") }),
        ...(obj?.statuses?.length &&
          obj.statuses.length !== 4 && { statuses: obj.statuses.join(",") }),
        ...(obj?.page && Number(obj.page) !== 1 && { page: obj.page }),
        ...(obj?.limit && Number(obj.limit) !== 10 && { limit: obj.limit }),
      };
      if (!isEqual(params, this.paramsCurrent)) {
        this.paramsCurrent = structuredClone(params);
        return params;
      } else if (force) {
        params.page = params.page + 1;
        this.paramsCurrent = structuredClone(params);
        return params;
      }
      return false;
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
