<template>
  <li class="grid">
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

        <p
          v-if="articl.doi"
          class="doi"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17 17"
          ><circle
            class="a"
            cx="8.5"
            cy="8.5"
            r="8.5"
          /><path
            class="b"
            d="M1498,1002.49h-1.57v-.64a2.71,2.71,0,0,1-.7.49,2.23,2.23,0,0,1-1,.27,2.31,2.31,0,0,1-1.57-.59,2.65,2.65,0,0,1-.8-2,2.43,2.43,0,0,1,.84-1.94,2.5,2.5,0,0,1,1.57-.69,2.59,2.59,0,0,1,1,.17,2.83,2.83,0,0,1,.66.46v-3.37H1498Zm-1.61-2.49a1.25,1.25,0,0,0-.29-.86,1.43,1.43,0,0,0-.89-.4,1.21,1.21,0,0,0-.86.5,1.26,1.26,0,0,0-.26.78,1.21,1.21,0,0,0,.27.75,1,1,0,0,0,.78.43,1.32,1.32,0,0,0,.87-.34A1.29,1.29,0,0,0,1496.37,1000Z"
            transform="translate(-1491.5 -991.39)"
          /><path
            class="c"
            d="M1505.37,994.66a.92.92,0,0,0-.94.94.94.94,0,0,0,.27.67.95.95,0,0,0,1.34-1.34A.94.94,0,0,0,1505.37,994.66Zm-4.15,2.64a2.82,2.82,0,0,0-2.25.91,2.59,2.59,0,0,0-.65,1.73,2.67,2.67,0,0,0,.65,1.82,3.11,3.11,0,0,0,4.4,0,2.75,2.75,0,0,0,0-3.55A2.72,2.72,0,0,0,1501.22,997.3Zm3.31.18v5h1.68v-5Zm-3.36,1.34a1,1,0,0,1,.78.34,1.12,1.12,0,0,1,.33.82,1.18,1.18,0,0,1-.32.83,1.07,1.07,0,0,1-.79.33,1,1,0,0,1-.84-.41,1.13,1.13,0,0,1-.27-.75,1.15,1.15,0,0,1,.27-.75A1,1,0,0,1,1501.17,998.82Z"
            transform="translate(-1491.5 -991.39)"
          /></svg> {{ articl.doi }}
        </p>
        <p>
          {{ monthStr }}<span
            v-if="monthStr && articl.year"
          >,</span> {{ articl.year }}
        </p>
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
        class="line-main"
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
      <li
        v-if="params.authors"
        class="line-main"
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
      <li
        v-for="author in articl.authors"
        :key="author.nameLast"
        class="line-main"
      >
        <ul>
          <li>{{ author.nameFirst }} {{ author.nameLast }}</li>
          <li>
            {{ author.affilliation }}
          </li>
        </ul>
      </li>
    </ul>
    =

    <!--

  doi: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    author: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      trim: true,
      default: 0,
      index: true,
    },
    oldId: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "Published",
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    abstract: {
      type: String,
      required: false,
      trim: true,
    },
    authors: { type: String, required: false, trim: true },
    affiliation: { type: String, required: false, trim: true },
    city: { type: String, required: false, trim: true },
    country: { type: String, required: false, trim: true },
    dateEnd: { type: String, required: false, trim: true },
    dateStart: { type: String, required: false, trim: true },
    description: {
      type: String,
      required: false,
      trim: false,
    },
    fullText: { type: String, required: false, trim: true },
    year: {
      type: Number,
      required: false,
      trim: true,
      index: true,
    },
    thumbnailImage: {
      type: String,
      required: false,
      trim: true,
    },
    url: {
      type: String,
      required: false,
      trim: true,
    },
    venue: {
      type: String,
      required: false,
      trim: true,
    },
    imageCaption: {
      type: String,
      required: false,
      trim: true,
    },
    imageLocalPath: {
      type: String,
      required: false,
      trim: true,
    },
    imageOriginalUrl: {
      type: String,
      required: false,
      trim: true,
    },
    imageRemotePath: {
      type: String,
      required: false,
      trim: true,
    },
    institution: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    journal: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    month: {
      type: String,
      required: false,
      trim: true,
    },
    resourceType: {
      type: String,
      required: false,
      trim: true,
    },
    reviewSource: {
      type: String,
      required: false,
      trim: true,
    },
    reviewUrl: {
      type: String,
      required: false,
      trim: true,
    },
    shortTitle: {
      type: String,
      required: false,
      trim: true,
    },
    source: {
      type: String,
      required: false,
      trim: true,
    },
    sourceId: {
      type: String,
      required: false,
      trim: true,
    },
    sourceIdType: {
      type: String,
      required: false,
      trim: true,
    },
    startDate: {
      type: String,
      required: false,
      trim: true,
    },
    state: {
      type: String,
      required: false,
      trim: true,
    },
    articlUrl: "",
-->

    <div
      v-if="isLoggedIn"
      class="admin"
    >
      <articl-actions
        :id="articl.id"
        :title="articl.title"
      />
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

import ArticlActions from "@/components/layout/ArticlActions.vue";
import { highlightedSubstring, isNumber, noCaseIndexOf } from "@/services/stringsService";

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
    monthStr() {

      if (!isNumber(Number(this.articl.month))) {

        console.log("not number", this.articl.month);
        return this.articl.month;

      }

      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.articl.month - 1];

    },
  },
  methods: {
    highlightedSubstring,
    noCaseIndexOf,
  },
};

</script>

<style scoped lang="scss">
.outline {
  border: 1px solid var(--bg0);
  margin-bottom: var(--spacing);
}

a {
  cursor:pointer;
}

#app > main > article > div > div > small > ul > li > a {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  color: red !important;
  cursor: pointer;
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
  white-space: nowrap;
  line-height: 1rem;
}

li:nth-child(even){
    background-color: var(--bg1);
}

svg {

  a{ fill:#fcb425; }

  .b{ fill:#231f20; }

  .c{ fill:#fff; }
}

</style>
