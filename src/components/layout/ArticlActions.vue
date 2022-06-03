<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'editArticl', params: { id } }">
          edit</router-link
        >
      </li>
      <li>
        <a>Change status</a>
      </li>
      <li>
        <router-link :to="{ name: 'deleteArticl', params: { id, title } }">
          delete
        </router-link>
      </li>
    </ul>
  </nav>
  <ul role="listbox"></ul>
</template>

<script>
import { isLoggedIn } from "@/services/tokensService";

export default {
  name: "ArticlActions",
  props: ["id", "title"],
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
li {
  font-size: 0.6rem;
  border: 1px solid white;
  border-right: 0;
  padding: 0 0.6rem;
}
li:last-child {
  border-right: 1px solid white;
}
</style>
