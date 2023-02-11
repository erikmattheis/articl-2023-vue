<template>
  <div class="articl">
    <ul>
      <li class="title container">
        <a
          :data-tooltip="linkMessage"
          :href="articl.articlUrl"
          class="box"
          target="_blank">
          {{ articl.title }}
        </a>

        <articl-actions
          :id="articl.id"
          class="box"
          :title="articl.title"
          :slug="articl.slug"
          :type="articl.type" />
      </li>

      <li class="articl-details">
        <p class="authors-list">
          {{ authorsList }}
        </p>
        <details>
          <summary>
            Affiliations
          </summary>
          <ul>
            <li
              v-for="author in articl.authors"
              :key="author.nameLast"
              class="grid">
              {{ author.nameFirst }} {{ author.nameLast }}

              <ul v-if="author.affilliations.length">
                <li
                  v-for="affilliation in author.affilliations"
                  :key="affilliation">
                  {{ affilliation }}
                </li>
              </ul>
            </li>
          </ul>
        </details>
      </li>

      <li
        v-if="articl.journal"
        class="articl-details">
        {{ articl.journal }} <span v-if="articl.year">{{ articl.year }}</span> | <a
          :data-tooltip="linkMessage"
          :href="articl.articlUrl"
          target="_blank">{{ articl.articlUrl }}</a>
      </li>

      <li
        v-if="articl.authorsOrig"
        class="articl-details">
        <small>
          {{ highlightedSubstring(articl.authorsOrig, params.authors, "prefix")
          }}<strong
            :class="{
              'not-strong': noCaseIndexOf(articl.authorsOrig, params.authors) === -1,
            }">{{
            highlightedSubstring(articl.authorsOrig, params.authors, "term")
          }}</strong>{{ highlightedSubstring(articl.authorsOrig, params.authors, "suffix") }}
        </small>
      </li>

      <li
        v-if="articl.source"
        class="articl-details">
        {{ articl.source }}
      </li>

      <li
        v-if="articl.abstract"
        class="articl-details">
        <details>
          <summary>Abstract</summary>
          <div>
            {{ articl.abstract }}
          </div>
        </details>
      </li>

      <li
        v-if="articl.fullText"
        class="articl-details">
        <details>
          <summary>Full text</summary>
          <div>
            {{ articl.fullText }}
          </div>
        </details>
      </li>

      <li
        v-if="articl.thumbnailImage"
        class="articl-details">
        <img
          :src="articl.thumbnailImage"
          :alt="articl.title">
      </li>

      <li
        v-if="articl.url"
        class="articl-details">
        <img
          :src="articl.url"
          :alt="articl.title"><br>
        {{ articl.url }}
      </li>

      <li
        v-if="articl.imageCaption"
        class="articl-details">
        {{ articl.imageCaption }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ArticlActions from '@/components/layout/ArticlActions.vue';
import { highlightedSubstring, isNumber, noCaseIndexOf } from '@/services/stringsService';

export default {
  name: 'ArticlsListItem',
  components: {
    ArticlActions,
  },
  props: {
    articl: {
      type: Object,
      default: null,
    },
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      params: 'articlsParams/params',
    }),
    monthStr() {
      if (!isNumber(Number(this.articl.month))) {
        return this.articl.month;
      }

      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.articl.month - 1];
    },
    linkMessage() {
      try {
        return `Read article on ${(new URL(this.articl.articlUrl)).hostname.replace('www.', '')}`;
      } catch {
        return 'Malformed url';
      }
    },
    authorsList() {
      if (this.articl?.authors?.map) {
        const list = this.articl.authors.map((author) => `${author.nameFirst} ${author.nameLast}`);
        return list.join(', ');
      }
      return [];
    },
  },
  methods: {
    highlightedSubstring,
    noCaseIndexOf,
  },

};

</script>

<style scoped lang="scss">

.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: minmax(200px, 1fr) 200px;
  color: #444;
}

li {
  width:100%;
  padding:

  a {
    cursor: pointer;
  }
}

li:hover {
  background-color: var(--primary-nav-background);
}

.articl {
  border-bottom: 1px solid $grey-100;
  margin-bottom: calc(var(--typography-spacing-vertical) * 0.5);
}

.articl:last-child {
  border: 0 !important;
}

.authors-list {
  margin-bottom: calc(var(--typography-spacing-vertical) * 0.25);
}

details {
  margin-bottom: calc(vsr(--typography-spacing-vertical) * 0.25);
  border-bottom: 0;
}

summary,
details,
.articl-details {
  font-size: 0.875rem;
}

a {
  cursor: pointer;
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

.grid > ul li {
  width: 100%;
  margin-bottom: 0;
}

</style>
