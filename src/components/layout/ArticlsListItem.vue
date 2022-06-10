<template>
  <li>
    <div class="grid">
      <ul>
        <li>
          <a
            :href="articl.articlUrl"
            target="_blank"
          >
            {{ highlightedSubstring(articl.title,params.title,"prefix")
            }}<strong
              :class="{
                'not-strong': !noCaseIndexOf(articl.title,params.title) > 0,
              }"
            >{{
              highlightedSubstring(articl.title,params.title,"term")
            }}</strong>{{ highlightedSubstring(articl.title,params.title,"suffix") }}</a>
        </li>
        <li v-if="articl.titleExcerpt">
          <a :href="articl.url">
            {{ highlightedSubstring(articl.titleExcerpt,params.title,"prefix")
            }}<strong
              :class="{
                'not-strong': !noCaseIndexOf(articl.titleExcerpt,params.title) > 0,
              }"
            >{{
              highlightedSubstring(articl.titleExcerpt,params.title,"term")
            }}</strong>{{
              highlightedSubstring(articl.titleExcerpt,params.title,"suffix")
            }}</a>
        </li>
        <li v-if="params.authors">
          {{ highlightedSubstring(articl.authors,params.authors,"prefix")
          }}<strong
            :class="{
              'not-strong': !noCaseIndexOf(articl.titleExcerpt,params.title) > 0,
            }"
          >{{
            highlightedSubstring(articl.authors,params.authors,"term")
          }}</strong>{{ highlightedSubstring(articl.authors,params.authors,"suffix") }}
        </li>
        <li v-if="params.journal">
          <strong>{{ articl.journal }}</strong>
        </li>
        <li v-if="articl.yearComparison&&Number(articl.year)!==yearsStart">
          <strong>{{ articl.yearComparison }}{{ articl.year }}</strong>
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
import { mapGetters } from 'vuex';

import ArticlActions from '@/components/layout/ArticlActions.vue';
import { highlightedSubstring, noCaseIndexOf } from '@/services/stringsService';

export default {
  name: 'ArticlsListItem',
  components: {
    ArticlActions,
  },
  props: {
    articl: {
      type: Object,
      default: undefined,
    },
  },
  data: () => {

    return {
      articls: [],
      totalResults: '--',
      isLoading: false,
    };

  },

  computed: {
    ...mapGetters({
      params: 'articlsParams/params',
      allTypes: 'articlsParams/allTypes',
      allStatuses: 'articlsParams/allStatuses',
      yearsStart: 'articlsParams/yearsStart',
      isLoggedIn: 'tokens/isLoggedIn',
    }),
  },

  methods: {
    highlightedSubstring,
    noCaseIndexOf,
  },
};
</script>

<style scoped>
#app > main > article > div > div > small > ul > li > a {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  color: red !important;
}

.handle-container {
  width: 1rem !important;
}

strong:not([class="not-strong"]) {
  background-color: #749157;
  color: black;
  padding: 0.2rem 0.1rem;
}
li {
  width:100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis
}
a {
  cursor:pointer;
}
</style>

