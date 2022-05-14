<template>
  <article>
    <h1>Articls</h1>
    <div class="grid">
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
      <div>
        <small>
          <ul>
            <li v-if="!!totalResults">Results: {{ totalResults }}</li>
            <li v-if="!!title">
              Title contains <strong>{{ title }}</strong>
              <a href @click.prevent="clearValue('title')"
                ><vue-feather size="1.2rem" type="x-square"
              /></a>
            </li>
            <li v-if="!!journal">
              Journal is <strong>{{ journal }}</strong>
              <a @click.prevent="clearValue('journal')"
                ><vue-feather size="1.2rem" type="x-square" />
              </a>
            </li>
            <li v-if="!!authors">
              Authors contains <strong>{{ authors }}</strong>
              <a @click.prevent="clearValue('authors')"
                ><vue-feather size="1.2rem" type="x-square" />
              </a>
            </li>
            <!--
            Number(year):{{
              Number(year)
            }}<br />
            Number(year)!== yearsStart:
            {{
              Number(year) !== yearsStart
            }}<br />
            year && Number(year) !== yearsStart:{{
              year && Number(year) !== yearsStart
            }}
            -->
            <li v-if="year && Number(year) !== yearsStart">
              Year is <strong>{{ yearComparison }} {{ year }}</strong>
              <a @click.prevent="clearValue('year')"
                ><vue-feather size="1.2rem" type="x-square"
              /></a>
            </li>
            <li v-if="types?.length !== 9">
              Type is <span v-if="types?.length > 1">one of </span>
              <strong>{{ toListWithOptionalConjuction(types, "or") }}</strong>
              <a @click.prevent="resetValues('types')"
                ><vue-feather size="1.2rem" type="x-square"
              /></a>
            </li>
            <li v-if="statuses?.length !== 4">
              Status is <span v-if="statuses?.length > 1">one of </span>
              <strong>{{
                toListWithOptionalConjuction(statuses, "or")
              }}</strong>
              <a @click.prevent="resetValues('statuses')"
                ><vue-feather size="1.2rem" type="x-square"
              /></a>
            </li>
          </ul>
        </small>

        <ol>
          <li
            v-for="(articl, index) in articls"
            :key="index"
            class="grid"
            :class="{ 'light-bg': index % 2 === 0 }"
          >
            <ul>
              <li v-if="articl.title && title">
                {{
                  articl.title.substring(
                    0,
                    titleMatchIndex(articl.title, title)
                  )
                }}<strong>{{
                  articl.title.substring(
                    titleMatchIndex(articl.title, title),
                    titleMatchIndex(articl.title, title) + title.length
                  )
                }}</strong
                >{{
                  articl.title.substring(
                    titleMatchIndex(articl.title, title) + title.length,
                    articl.title.length - 2
                  )
                }}
              </li>
              articl.titleExcerpt:{{
                articl.titleExcerpt
              }}
              <li v-if="articl.titleExcerpt">
                {{
                  articl.titleExcerpt.substring(
                    0,
                    titleMatchIndex(articl.titleExcerpt, title)
                  )
                }}<strong>{{
                  articl.titleExcerpt.substring(
                    titleMatchIndex(articl.titleExcerpt, title),
                    titleMatchIndex(articl.titleExcerpt, title) + title.length
                  )
                }}</strong
                >{{
                  articl.titleExcerpt.substring(
                    titleMatchIndex(articl.titleExcerpt, title) + title.length,
                    articl.titleExcerpt.length - 2
                  )
                }}
              </li>
              <li v-if="authors">
                {{
                  articl.authors.substring(
                    0,
                    titleMatchIndex(articl.authors, authors)
                  )
                }}<strong>{{
                  articl.authors.substring(
                    titleMatchIndex(articl.authors, authors),
                    titleMatchIndex(articl.authors, authors) + authors.length
                  )
                }}</strong
                >{{
                  articl.authors.substring(
                    titleMatchIndex(articl.authors, authors) + authors.length,
                    articl.authors.length - 2
                  )
                }}
              </li>
              <li v-if="journal">
                {{
                  articl.journal.substring(
                    0,
                    titleMatchIndex(articl.journal, journal)
                  )
                }}<strong>{{
                  articl.journal.substring(
                    titleMatchIndex(articl.journal, journal),
                    titleMatchIndex(articl.journal, journal) + journal.length
                  )
                }}</strong
                >{{
                  articl.journal.substring(
                    titleMatchIndex(articl.journal, journal) + journal.length,
                    articl.journal.length - 2
                  )
                }}
              </li>
              <li v-if="year && Number(year) !== yearsStart">
                {{ yearComparison }} <strong>{{ year }}</strong>
              </li>
            </ul>
          </li>

          <infinite-loading @infinite="infiniteHandler"></infinite-loading>

          <!--
            <template v-slot:spinner>Loading...</template>
            <template v-slot:no-more>No more message</template>
            <template v-slot:no-results>No results message</template>
            -->
        </ol>
      </div>
    </div>
  </article>
</template>

<script>
import { isEqual, debounce } from "lodash";
import VueFeather from "vue-feather";
import InputTypeahead from "@/components/ui/InputTypeahead.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
export default {
  name: "listArticlsPage",
  components: { VueFeather, InputTypeahead, InfiniteLoading },
  data() {
    return {
      advanced: null,
      allStatuses: [],
      allTypes: [],
      articls: [],
      authors: "",
      buttonDisabled: false,
      comparisons: ["after", "before", "exactly"],
      journal: "",
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
    this.years = [
      ...Array(new Date().getUTCFullYear() - (this.yearsStart - 1)).keys(),
    ]
      .map((x) => this.yearsStart + x++)
      .reverse();
    this.year = this.yearsStart;
    this.allTypes = this.types.slice();
    this.allStatuses = this.statuses.slice();
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
    titleMatchIndex(str, subStr) {
      if (!str || !subStr) {
        return false;
      }
      return str.toLowerCase().indexOf(subStr.toLowerCase());
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
    async infiniteHandler() {
      const params = this.assembleParams(this, true);
      if (params) {
        const result = await this.getArticls(params);
        //console.log(result.results);
        this.articls.push(result.results.slice());
        this.totalPages = result.totalPages;
        this.limit = result.limit;
        this.totalResults = result.totalResults;
        //if (result.totalResults <= this.limit * this.page) $state.complete();
      }
    },
    async updateValues(obj) {
      const params = this.assembleParams(obj);

      if (params) {
        const result = await this.getArticls(params);
        this.articls = result?.results?.slice();
        this.totalPages = result.totalPages;
        this.page = result.page;
        this.limit = result.limit;
        this.totalResults = result.totalResults;
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
            console.log();
            return result.data;
          }
          return {};
        })
        .catch((error) => this.$store.dispatch("setError", error));
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
strong {
  background-color: rgb(181, 228, 133);
  color: black;
  padding: 0.2rem 0.1rem;
}
</style>
