<template>
  <small>
    <ul>
      <li v-if="!!title">
        title contains <strong>{{ title }}</strong>
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
      <li v-if="year && Number(year) !== yearsStart">
        Year is
        <strong>{{ yearComparison }} {{ year }}</strong>
        <a @click.prevent="clearValue('year')"
          ><vue-feather size="1.2rem" type="x-square"
        /></a>
      </li>
      <li v-if="types?.length">
        Type is <span v-if="types.length > 1">one of </span>
        <strong>{{ toListWithOptionalConjuction(types, "or") }}</strong>
        <a @click.prevent="resetValues('types')"
          ><vue-feather size="1.2rem" type="x-square"
        /></a>
      </li>
      <li v-if="statuses?.length !== 4">
        Status is <span v-if="statuses.length > 1">one of </span>
        <strong>{{ toListWithOptionalConjuction(statuses, "or") }}</strong>
        <a @click.prevent="resetValues('statuses')"
          ><vue-feather size="1.2rem" type="x-square"
        /></a>
      </li>
    </ul>
  </small>
</template>

<script>
import { mapGetters } from "vuex";
import VueFeather from "vue-feather";
import { toListWithOptionalConjuction } from "@/services/stringsService";

export default {
  name: "TheArticlsSearchParams",
  emits: ["clearValue"],
  components: {
    VueFeather,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      title: "articlsParams/title",
      journal: "articlsParams/journal",
      authors: "articlsParams/authors",
      year: "articlsParams/year",
      yearComparison: "articlsParams/yearComparison",
      yearsStart: "articlsParams/yearsStart",
      types: ["articlsParams/types"],
      statuses: "articlsParams/statuses",
    }),
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
      this.$emit("clearValue", varName);
    },
    toListWithOptionalConjuction,
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
</style>
