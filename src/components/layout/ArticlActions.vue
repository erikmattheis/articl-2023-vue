<template>
  <nav>
    <ul class="right">
      <li v-if="!expanded">
        <a href @click.prevent="expanded = true"
          ><vue-feather
            size="2rem"
            type="menu"
            aria-label="Actions"
          ></vue-feather
        ></a>
      </li>
      <li v-if="expanded">
        <a href @click.prevent="expanded = false"
          ><vue-feather size="2rem" type="x" aria-label="Actions"></vue-feather
        ></a>
      </li>
    </ul>
    <ul class="above right" v-if="expanded">
      <li>
        <router-link :to="{ name: 'createArticlPage', params: { id } }">
          edit
          <vue-feather
            size="0.5rem"
            type="search"
            aria-label="Edit"
          ></vue-feather>
        </router-link>
        <router-link :to="{ name: 'articlDelete', id: id }">
          delete
          <vue-feather
            size="0.5rem"
            type="search"
            aria-label="Delete"
          ></vue-feather>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import VueFeather from "vue-feather";
import { isLoggedIn } from "@/services/tokensService";

export default {
  name: "ArticlActions",
  props: ["id"],
  components: {
    VueFeather,
  },
  data() {
    return { expanded: false };
  },
  computed: {
    isLoggedIn,
  },
  methods: {},
};
</script>

<style scoped>
.above {
  position: absolute;
  top: 0;
  right: 0;
}
svg {
  width: 2rem;
  height: 2rem;
}
.a {
  fill: #039be5;
}
articl nav {
  overflow: auto;
}
</style>
