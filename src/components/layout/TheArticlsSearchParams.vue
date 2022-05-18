<template>
  <small>
    <ul>
      <li v-if="params.title">
        Title contains <strong>{{ params.title }}</strong>
        <a href @click.prevent="resetValue('title')"
          ><vue-feather size="1.2rem" type="x-square"
        /></a>
      </li>

      <li v-if="params.journal">
        Journal is <strong>{{ params.journal }}</strong>
        <a @click.prevent="resetValue('journal')"
          ><vue-feather size="1.2rem" type="x-square" />
        </a>
      </li>
      <li v-if="params.authors">
        Authors contains <strong>{{ params.authors }}</strong>
        <a @click.prevent="resetValue('authors')"
          ><vue-feather size="1.2rem" type="x-square" />
        </a>
      </li>

      <li v-if="params?.year && Number(params?.year) !== yearsStart">
        Year is
        <strong>{{ params?.yearComparison }} {{ params?.year }}</strong>
        <a @click.prevent="resetValue('year')"
          ><vue-feather size="1.2rem" type="x-square"
        /></a>
      </li>

      <li
        v-if="
          params?.types?.length && params?.types?.length !== allTypes?.length
        "
      >
        Type is <span v-if="params.types?.length > 1">one of </span>
        <strong>{{ toListWithOptionalConjuction(params.types, "or") }}</strong>
        <a @click.prevent="resetValue('types')"
          ><vue-feather size="1.2rem" type="x-square"
        /></a>
      </li>
      <li
        v-if="
          params?.statuses?.length &&
          params?.statuses?.length !== allStatuses?.length
        "
      >
        Status is <span v-if="params?.statuses?.length > 1">one of </span>
        <strong>{{
          toListWithOptionalConjuction(params.statuses, "or")
        }}</strong>
        <a @click.prevent="resetValue('statuses')"
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
  components: {
    VueFeather,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      params: "articlsParams/params",
      allTypes: "articlsParams/allTypes",
      allStatuses: "articlsParams/allStatuses",
      yearsStart: "articlsParams/yearsStart",
    }),
  },
  methods: {
    resetValue(arrName) {
      switch (arrName) {
        case "statuses": {
          this.$store.dispatch(
            "articlsParams/setStatuses",
            this.allStatuses?.slice()
          );
          break;
        }
        case "types": {
          this.$store.dispatch(
            "articlsParams/setTypes",
            this.allTypes?.slice()
          );
          break;
        }
        case "title": {
          this.$store.dispatch("articlsParams/setTitle", "");
          break;
        }

        case "journal": {
          this.$store.dispatch("articlsParams/setJournal", "");
          break;
        }
        case "authors": {
          this.$store.dispatch("articlsParams/setAuthors", "");
          break;
        }
      }
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
