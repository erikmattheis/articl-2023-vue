<template>
  <li>
    <div v-if="$store.getters['tokens/isLoggedIn']">
      <a href=""
        ><vue-feather size="2rem" type="move" aria-label="move"></vue-feather
      ></a>
    </div>
    <ul>
      <li v-if="articl.score">score:{{ score }}</li>
      <li v-if="articl.title">
        {{ highlightedSubstring(articl.title, params.title, "prefix")
        }}<strong
          :class="{
            'not-strong': noCaseIndexOf(articl.title, params.title) === -1,
          }"
          >{{
            highlightedSubstring(articl.title, params.title, "term")
          }}</strong
        >{{ highlightedSubstring(articl.title, params.title, "suffix") }}
      </li>
      <li v-if="articl.titleExcerpt">
        {{ highlightedSubstring(articl.titleExcerpt, params.title, "prefix")
        }}<strong
          :class="{
            'not-strong':
              noCaseIndexOf(articl.titleExcerpt, params.title) === -1,
          }"
          >{{
            highlightedSubstring(articl.titleExcerpt, params.title, "term")
          }}</strong
        >{{ highlightedSubstring(articl.titleExcerpt, params.title, "suffix") }}
      </li>
      <li v-if="params.authors">
        {{ highlightedSubstring(articl.authors, params.authors, "prefix")
        }}<strong
          :class="{
            'not-strong': noCaseIndexOf(articl.authors, params.authors) === -1,
          }"
          >{{
            highlightedSubstring(articl.authors, params.authors, "term")
          }}</strong
        >{{ highlightedSubstring(articl.authors, params.authors, "suffix") }}
      </li>
      <li v-if="params.journal">
        <strong>{{ articl.journal }}</strong>
      </li>
      <li v-if="articl.yearComparison && Number(articl.year) !== yearsStart">
        <strong>{{ articl.yearComparison }}{{ articl.year }}</strong>
      </li>
    </ul>
    <div v-if="$store.getters['tokens/isLoggedIn']">
      <articl-actions :id="articl.id"></articl-actions>
    </div>
  </li>
</template>   

<script>
import { mapGetters } from "vuex";
import VueFeather from "vue-feather";
import { highlightedSubstring, noCaseIndexOf } from "@/services/stringsService";
import ArticlActions from "@/components/layout/ArticlActions.vue";

export default {
  name: "ArticlsListItem",
  props: ["articl"],
  components: { VueFeather, ArticlActions },
  data() {
    return { articls: [], totalResults: "--", isLoading: false };
  },

  computed: {
    ...mapGetters({
      params: "articlsParams/params",
      allTypes: "articlsParams/allTypes",
      allStatuses: "articlsParams/allStatuses",
      yearsStart: "articlsParams/yearsStart",
    }),
  },
  methods: { highlightedSubstring, noCaseIndexOf },
};
</script>

<style scoped>
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
  background-color: #749157;
  color: black;
  padding: 0.2rem 0.1rem;
}
</style>
