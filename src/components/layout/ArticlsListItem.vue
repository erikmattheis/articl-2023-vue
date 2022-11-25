<articl-articl data="articl" class="articl-tab-content-hidden ng-isolate-scope">
<div class="articl-spacing">
  <span class="articl-smaller-text text-muted">
      <span ng-bind-html="data.authors" class="ng-binding">Felipe VC, Graziano L, Barbosa PNVP, Bitencourt AGV</span>
      <!-- ngIf: ::(data.directory_link_resource_type[0].name === 'Web') -->
  </span>

  <!-- ngIf: ::(data.directory_link_type.name === 'Conferences') -->
  <!-- ngIf: ::data.journal --><div class="articl-smaller-text text-muted ng-scope" ng-if="::data.journal">
      <span ng-bind-html="data.journal" class="ng-binding">Radiologia brasileira</span><!-- ngIf: data.journal && (data.month || data.year) --><span ng-if="data.journal &amp;&amp; (data.month || data.year)" class="ng-scope">, </span><!-- end ngIf: data.journal && (data.month || data.year) --><!-- ngIf: ::(data.journal && data.month && data.year) --><span ng-if="::(data.journal &amp;&amp; data.month &amp;&amp; data.year)" ng-bind-html="::data['month-name']" class="ng-binding ng-scope">November</span><!-- end ngIf: ::(data.journal && data.month && data.year) --><!-- ngIf: ::(data.journal && data.month && data.year) --><span ng-if="::(data.journal &amp;&amp; data.month &amp;&amp; data.year)" class="ng-scope">, </span><!-- end ngIf: ::(data.journal && data.month && data.year) --><!-- ngIf: ::data.year --><span ng-if="::data.year" ng-bind-html="::data.year" class="ng-binding ng-scope">2020</span><!-- end ngIf: ::data.year -->
  </div><!-- end ngIf: ::data.journal -->
</div>
</articl-articl>


<template>
  <div class="grid">
    <ul>
      <li class="title">
        <a
          :href="articl.articlUrl"
          target="_blank"
        >
          {{ articl.title }}
        </a>

        <div
          v-if="isLoggedIn"
          class="admin articl-actions"
        >
          <articl-actions
            :id="articl.id"
            class="tools"
            :title="articl.title"
          />
        </div>
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

      <li v-if="articl.journal">
        {{ articl.journal }} <span v-if="articl.year">{{ articl.year }}</span>
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
    </ul>
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

li:not(.title) {
  font-size: 0.875rem;
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

.grid ul li {
  margin-bottom: 0;
}

.grid ul li:last-child {
  margin-bottom: calc(var(--typography-spacing-vertical) * 0.25);
}

/*
li {
  width:100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1rem;
}

li:nth-child(even){
    background-color: var(--bg1);
}
*/

.grid {
  grid-template-columns: auto auto;
  border-bottom: 1px solid var(--muted-color);
  border-bottom-style: solid;
}
</style>
