<template>
  <li>
    <div class="grid">
      <ul>
        <li class="line-main">
          <a
            :href="articl.articlUrl"
            target="_blank"
          >
            {{ highlightedSubstring(articl.title,params.title,"prefix")
            }}<strong
              :class="{
                'not-strong': noCaseIndexOf(articl.title, params.title) === -1,
              }"
            >{{
              highlightedSubstring(articl.title, params.title, "term")
            }}</strong>{{ highlightedSubstring(articl.title, params.title, "suffix") }}</a>
        </li>
        <li
          v-if="articl.titleExcerpt"
          class="line-main"
        >
          <a :href="articl.url">
            {{ highlightedSubstring(articl.titleExcerpt,params.title,"prefix")
            }}<strong
              :class="{
                'not-strong': noCaseIndexOf(articl.titleExcerpt,params.title) === -1,
              }"
            >{{
              highlightedSubstring(articl.titleExcerpt,params.title,"term")
            }}</strong>{{
              highlightedSubstring(articl.titleExcerpt,params.title,"suffix")
            }}</a>
        </li>
        <li
          v-if="params.authors"
          class="line-detail"
        >
          <small>
            {{ highlightedSubstring(articl.authors,params.authors,"prefix")
            }}<strong
              :class="{
                'not-strong': noCaseIndexOf(articl.authors,params.authors) === -1,
              }"
            >{{
              highlightedSubstring(articl.authors,params.authors,"term")
            }}</strong>{{ highlightedSubstring(articl.authors,params.authors,"suffix") }}

            <ul class="right">
              <li v-if="articl.journal"><strong>{{ articl.journal }}</strong></li>
              <li v-if="articl.yearComparison && Number(articl.year)!==yearsStart"><strong>{{ articl.yearComparison }}{{ articl.year }}</strong></li>
            </ul>
          </small>
        </li>
      </ul>
      <div v-if="isLoggedIn">
        <articl-actions
          :id="articl.id"
          :title="articl.title"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

import ArticlActions from "@/components/layout/ArticlActions.vue";
import { highlightedSubstring, noCaseIndexOf } from "@/services/stringsService";

export default {
  name: "ArticlsListItem",
  components: {
    ArticlActions,
  },
  props: {
    articl: {
      type: Object,
      default: null,
    },
  },
  data: () => {

    return {
      articls: [],
      totalResults: "--",
    };

  },

  computed: {
    ...mapGetters({
      params: "articlsParams/params",
      allTypes: "articlsParams/allTypes",
      allStatuses: "articlsParams/allStatuses",
      yearsStart: "articlsParams/yearsStart",
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },

  methods: {
    highlightedSubstring,
    noCaseIndexOf,
  },
};
</script>

<style scoped>
a {
  cursor:pointer;
}

#app > main > article > div > div > small > ul > li > a {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  color: red !important;
  cursor: pointer;
}

.handle-container {
  width: 1rem !important;
}

strong:not([class="not-strong"]) {
  padding: 0.2rem 0.1rem;
  color: black;
  background-color: #749157;
}

li {
  width:100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap
}

</style>
