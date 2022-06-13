<template>
  <ul class="articl-actions">
    <li>
      <router-link :to="{ name: 'editArticl', params: { passedId: id } }">
        edit
      </router-link>
    </li>
    <li>
      <a>Change status</a>
    </li>
    <li>
      <router-link :to="{ name: 'deleteArticl', params: { id, title } }">
        delete
      </router-link>
    </li>
    <li class="handle">
      <a href="#"><div class="sr">Reorder articl</div>
        <vue-feather
          alt="reorder articl"
          size="1rem"
          type="move"
          aria-label="move"
        />
      </a>
    </li>
  </ul>
</template>

<script>
import VueFeather from "vue-feather";
import { mapGetters } from "vuex";

export default {
  name: "ArticlActions",
  components: {
    VueFeather,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data: () => {

    return {
      expanded: false,
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },
};
</script>

<style scoped>

</style>
