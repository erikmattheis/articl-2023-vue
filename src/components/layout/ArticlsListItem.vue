<template>
  <div class="grid articl-card">
    <ul>
      <li>
        <h3>
          <a
            :href="articl.articlUrl"
            target="_blank"
          >
            {{ articl.title }}
          </a>
        </h3>
      </li>
      <li v-if="articl.titleExcerpt">
        <a :href="articl.articlUrl">
          {{ articl.titleExcerpt }}
        </a>
      </li>

      <li v-if="articl.journal">
        {{ articl.journal }}
      </li>
      <li v-if="articl.year">
        {{ articl.year }}
      </li>

      <li v-if="articl.authorsOrig">
        <small>
          {{ highlightedSubstring(articl.authorsOrig, params.authors,"prefix")
          }}<strong
            :class="{
              'not-strong': noCaseIndexOf(articl.authorsOrig, params.authors) === -1,
            }"
          >{{
            highlightedSubstring(articl.authorsOrig, params.authors,"term")
          }}</strong>{{ highlightedSubstring(articl.authorsOrig, params.authors,"suffix") }}
        </small>
      </li>
      <template
        v-for="author in articl.authors"
        :key="author.nameLast"
      >
        <li v-if="author.nameFirst || author.nameLast">
          {{ author.nameFirst }} {{ author.nameLast }}
        </li>
        <template
          v-if="author?.affilliations.length"
        >
          <li
            v-for="affilliation in author.affilliations"
            :key="affilliation"
          >
            {{ affilliation }}
          </li>
        </template>
      </template>

      <li v-if="articl.abstract">
        {{ articl.abstract }}
      </li>
      <li v-if="articl.fullText">
        {{ articl.fullText }}
      </li>
      <li v-if="articl.thumbnailImage">
        <img
          :src="articl.thumbnailImage"
          :alt="articl.title"
        >
      </li>
      <li v-if="articl.url">
        <img
          :src="articl.url"
          :alt="articl.title"
        ><br>
        {{ articl.url }}
      </li>
      <li v-if="articl.imageCaption">
        {{ articl.imageCaption }}
      </li>
      <li v-if="articl.institution">
        {{ articl.institution }}
      </li>
      <li v-if="articl.source">
        {{ articl.source }}
      </li>
      <li
        v-if="isLoggedIn && articl.status"
        class="admin"
      >
        {{ articl.status }}
      </li>
    </ul>
    <div
      v-if="isLoggedIn"
      class="admin"
    >
      <articl-actions
        :id="articl.id"
        class="tools"
        :title="articl.title"
      />
    </div>
  </div>
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

    };

  },
  computed: {
    ...mapGetters({
      allStatuses: "articlsParams/allStatuses",
      params: "articlsParams/params",
      isLoggedIn: "tokens/isLoggedIn",
    }),
    monthStr() {

      if (!isNumber(Number(this.articl.month))) {

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
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1rem;
}
/*
li:nth-child(even){
    background-color: var(--bg1);
}
*/
svg {

  a{ fill:#fcb425; }

  .b{ fill:#231f20; }

  .c{ fill:#fff; }
}
.grid {
  grid-template-columns: auto auto;
}
.tools {
  width: max-content;
}
</style>
