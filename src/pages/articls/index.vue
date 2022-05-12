<template>
  <article>
    <h1>Articls</h1>
    <div class="grid">
      <form>
        <details open>
          <summary role="button" class="secondary">Search text</summary>
          <label for="title">Title</label>
          <input type="text" v-model="title" @blur="onBlur" @keyup="onKeyup" />

          <label for="journal">Journal</label>
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
        </details>
        <details>
          <summary role="button" class="secondary">Advanced</summary>
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
            @change="updateValue"
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
      <div>
        <small>
          <ul>
            <li v-if="!!title">
              Title contains <strong>{{ title }}</strong>
            </li>
            <li v-if="!!journal">
              Journal is <strong>{{ journal }}</strong>
            </li>
            <li v-if="!!authors">
              Authors contains <strong>{{ authors }}</strong>
            </li>
            <li v-if="!!year && Number(year) !== 1944">
              Year is <strong>{{ yearComparison }} {{ year }}</strong>
            </li>
            <li v-if="types?.length !== 9">
              Type is <span v-if="types?.length > 1">one of </span>
              <strong>{{ toListWithOptionalConjuction(types, "or") }}</strong>
            </li>
            <li v-if="statuses?.length !== 4">
              Status is <span v-if="statuses?.length > 1">one of </span>
              <strong>{{
                toListWithOptionalConjuction(statuses, "or")
              }}</strong>
            </li>
          </ul>
        </small>
        <ol>
          <li
            v-for="(articl, index) in articls"
            :key="articl.id"
            class="grid"
            :class="{ 'light-bg': index % 2 === 0 }"
          >
            <ul>
              <li v-if="title">
                {{
                  articl.title.substring(
                    0,
                    articl.title.toLowerCase().indexOf(title.toLowerCase())
                  )
                }}<strong>{{
                  articl.title.substring(
                    articl.title.toLowerCase().indexOf(title.toLowerCase()),
                    articl.title.toLowerCase().indexOf(title.toLowerCase()) +
                      title.length
                  )
                }}</strong
                >{{
                  articl.title.substring(
                    articl.title.toLowerCase().indexOf(title.toLowerCase()) +
                      title.length,
                    articl.title.length - 2
                  )
                }}
              </li>
            </ul>
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
      advanced: null,
      articls: [],
      title: "",
      journal: "",
      authors: "",
      year: 1944,
      yearComparison: "after",
      comparisons: ["after", "before", "exactly"],
      buttonDisabled: false,
      totalPages: 1,
      page: 1,
      yearsStart: 1944,
      years: [],
      source: "",
      types: [
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
      allTypes: [],
      statuses: ["Published", "Draft", "Pending", "Trash"],
      allStatuses: [],
      paramsCurrent: {},
    };
  },
  created() {
    this.years = [
      ...Array(new Date().getUTCFullYear() - (this.yearsStart - 1)).keys(),
    ]
      .map((x) => this.yearsStart + x++)
      .reverse();
    this.allTypes = this.types.slice();
    this.allStatuses = this.statuses.slice();
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
  methods: {
    onTypeaheadUpdated(e) {
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
        this.page = result.page;
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
        ...(obj.yearComparison &&
          Number(obj.year) !== 1944 && { yearComparison: obj.yearComparison }),
        ...(obj.year && Number(obj.year) !== 1944 && { year: obj.year }),
        ...(obj.types && obj.types.length !== 9 && { types: obj.types }),
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
}

ol li {
  margin-bottom: 1rem;
  padding: 0.4rem;
}
.light-bg {
  background-color: #20303d;
}
strong {
  background-color: rgb(181, 228, 133);
  color: black;
  padding: 0.2rem 0;
}
</style>
