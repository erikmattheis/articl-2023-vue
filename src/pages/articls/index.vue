<template>
  <article>
    <h1>Articls</h1>
    <div class="grid">
      <the-articls-form-search />
      <div>
        <h2>Results displayed: {{ articls?.length }}</h2>
        <li>
          Results: {{ totalResults }} <span :aria-busy="isLoading"></span>
        </li>
        <the-articls-search-params></the-articls-search-params>
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
                >{{
                  highlightedSubstring(articl.title, params.title, "suffix")
                }}
              </li>
              <li v-if="articl.titleExcerpt">
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
              <li v-if="params.authors">
                {{
                  highlightedSubstring(
                    articl.authors,
                    params.authors,
                    "prefix"
                  )
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
              <li v-if="params.journal">
                <strong>{{ articl.journal }}</strong>
              </li>
              <li
                v-if="
                  articl.yearComparison && Number(articl.year) !== yearsStart
                "
              >
                <strong>{{ articl.yearComparison }}{{ articl.year }}</strong>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  </article>
</template>

<script>
import { isEqual } from "lodash";
import TheArticlsFormSearch from "@/components/layout/TheArticlsFormSearch.vue";
import TheArticlsSearchParams from "@/components/layout/TheArticlsSearchParams.vue";
import { highlightedSubstring, noCaseIndexOf } from "@/services/stringsService";

export default {
  name: "ArticlsList",
  components: {
    TheArticlsFormSearch,
    TheArticlsSearchParams,
  },
  data() {
    return { articls: [], totalResults: "--", isLoading: false };
  },

  watch: {
    params: {
      handler(newValue) {
        console.log("watched params changed");
        this.updateValues(newValue);
      },
      deep: true,
    },
  },
  methods: {
    noCaseIndexOf,
    highlightedSubstring,

    onParamsUpdated(params) {
      console.log("onParamsUpdated");
      this.updateValues(params);
    },
    async updateValues(params) {
      console.log("updateValues in list");

      if (isEqual(params, {})) {
        console.log("params is {}");
        this.articls = [];
        this.totalResults = "--";
        return;
      }

      if (params) {
        const result = await this.getArticls(params);
        if (Number(result.page) === 1 || result?.results?.length === 0) {
          console.log("Number(result.page)" + Number(result.page));
          console.log(
            "Number(result.results?.length)" + Number(result?.results?.length)
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
      console.log("getArticls");
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
        .catch((error) => this.$store.dispatch("errors/setError", error))
        .finally(() => (this.isLoading = false));
    },
    toListWithOptionalConjuction(arr, conj = "") {
      if (!arr || !arr.length) {
        return "";
      }
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
