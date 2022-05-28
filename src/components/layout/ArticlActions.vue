<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'editArticl', params: { id } }">
          edit
          <vue-feather
            size="0.5rem"
            type="search"
            aria-label="Edit"
          ></vue-feather
        ></router-link>
      </li>
      <li>
        <a
          >Change status
          <vue-feather
            size="0.5rem"
            type="list"
            aria-label="Change status"
          ></vue-feather>
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'deleteArticl', params: { id, title } }">
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
  <ul role="listbox"></ul>
</template>

<script>
import VueFeather from "vue-feather";
import { isLoggedIn } from "@/services/tokensService";

export default {
  name: "ArticlActions",
  props: ["id", "title"],
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
