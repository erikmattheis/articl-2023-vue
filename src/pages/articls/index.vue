<template>
  <article>
    <h1>Articls</h1>
    <div class="grid">
      <the-articls-form-search @update-params="onParamsUpdated">
      </the-articls-form-search>
      <h2>Results displayed:{{ articls.length }}</h2>
      <small>
        <ul>
          <li>
            Results: {{ totalResults }} <span :aria-busy="isLoading"></span>
          </li>
          <li v-if="!!title">
            params.title contains <strong>{{ params.title }}</strong>
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
            params.authors contains <strong>{{ params.authors }}</strong>
            <a @click.prevent="clearValue('authors')"
              ><vue-feather size="1.2rem" type="x-square" />
            </a>
          </li>
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
            <strong>{{ toListWithOptionalConjuction(statuses, "or") }}</strong>
            <a @click.prevent="resetValues('statuses')"
              ><vue-feather size="1.2rem" type="x-square"
            /></a>
          </li>
        </ul>
      </small>
      params.title:{{ params.title }}
      <ol>
        <li
          v-for="(articl, index) in articls"
          :key="articl.id"
          :class="{ 'light-bg': index % 2 === 0 }"
        >
          <ul>
            <li v-if="articl.title">
              {{ highlightedSubstring(articl.title, params.title, "prefix")
              }}<strong
                :class="{
                  'not-strong':
                    noCaseIndexOf(articl.title, params.title) === -1,
                }"
                >{{
                  highlightedSubstring(articl.title, params.title, "term")
                }}</strong
              >{{ highlightedSubstring(articl.title, params.title, "suffix") }}
            </li>
            <li v-if="articl.titleExcerpt && params.title">
              {{
                highlightedSubstring(
                  articl.titleExcerpt,
                  params.title,
                  "prefix"
                )
              }}<strong
                :class="{
                  'not-strong':
                    noCaseIndexOf(articl.titleExcerpt, params.title) === -1,
                }"
                >{{
                  highlightedSubstring(
                    articl.titleExcerpt,
                    params.title,
                    "term"
                  )
                }}</strong
              >{{
                highlightedSubstring(
                  articl.titleExcerpt,
                  params.title,
                  "suffix"
                )
              }}
            </li>
            <li v-if="articl.authors && params.authors">
              {{ highlightedSubstring(articl.authors, params.authors, "prefix")
              }}<strong
                :class="{
                  'not-strong':
                    noCaseIndexOf(articl.authors, params.authors) === -1,
                }"
                >{{
                  highlightedSubstring(articl.authors, params.authors, "term")
                }}</strong
              >{{
                highlightedSubstring(articl.authors, params.authors, "suffix")
              }}
            </li>
            <li v-if="journal">
              <strong>{{ articl.journal }}</strong>
            </li>
            <li v-if="articl.yearComparison && Number(year) !== yearsStart">
              <strong>{{ yearComparison }}{{ year }}</strong>
            </li>
          </ul>
        </li>
      </ol>
      <infinite-loading
        class="scroll-spy"
        @infinite="infiniteHandler"
      ></infinite-loading>
    </div>
  </article>
</template>

<script>
import { isEqual, debounce } from "lodash";
import VueFeather from "vue-feather";
import { mapGetters } from "vuex";
import InfiniteLoading from "v3-infinite-loading";
import TheArticlsFormSearch from "@/components/layout/TheArticlsFormSearch.vue";

import { highlightedSubstring, noCaseIndexOf } from "@/services/stringsService";
import "v3-infinite-loading/lib/style.css";

export default {
  name: "listArticlsPage",
  components: {
    TheArticlsFormSearch,
    VueFeather,
    InfiniteLoading,
  },
  data() {
    return {
      advanced: null,
      allStatuses: [],
      allTypes: [],
      articls: [],
      authors: "",
      buttonDisabled: false,
      comparisons: ["after", "before", "exactly"],
      isLoading: false,
      journal: "",
      limit: 5,
      page: 0,
      params: {},
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
    this.dummy = debounce(() => {});
  },
  watch: {
    params: {
      handler(newValue) {
        this.updateValues(newValue);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    onParamsUpdated(params) {
      console.log("onParamsUpdated");
      this.updateValues(params);
    },
    infiniteHandler() {
      console.log("infiniteHandler");
      this.params.page = this.params.page + 1;
      this.updateValues(this.params);
    },
    async updateValues(params) {
      console.log("updateValues in parent");
      this.params = params;
      if (isEqual(params, {})) {
        console.log("params is {}");
        this.articls = [];
        this.totalResults = "--";
        return;
      }

      if (params) {
        const result = await this.getArticls(params);
        if (Number(result.page) === 1 || result.results.length === 0) {
          console.log(
            "Number(result.page) === 1 || result.results.length === 0" +
              Number(result.page)
          );
          console.log(
            "Number(result.results.length === 0" + Number(result.results.length)
          );
          this.articls = [];
          this.totalResults = "--";
        }

        this.articls = this.articls.concat(result.results);
        this.totalPages = result.totalPages;
        this.limit = result.limit;
        this.totalResults = result.totalResults;
      } else {
        console.log("no params");
        return;
      }
    },
    async getArticls(params) {
      this.isLoading = true;
      return await this.$http({
        method: "GET",
        url: "/articls",
        params,
      })
        .then((result) => {
          if (result?.data) {
            return result.data;
          }
        })
        .catch((error) => this.$store.dispatch("setError", error))
        .finally(() => (this.isLoading = false));
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
