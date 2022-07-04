<template>
  <router-link
    :to="{ name: 'editArticl', params: { passedId: id } }"
    role="button"
  >
    edit
  </router-link>

  <a role="button">Change status</a>

  <router-link
    :to="{ name: 'deleteArticl', params: { id, title } }"
    role="button"
  >
    delete
  </router-link>

  <span class="handle">
    <a
      href="#"
      role="button"
    ><div class="sr">Reorder articl</div>
      <vue-feather
        alt="reorder articl"
        size="1rem"
        type="move"
        aria-label="move"
      />
    </a>
  </span>
</template>

<script>
import VueFeather from "vue-feather";

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
  data() {

    return {
      expanded: false,
    };

  },
};
</script>

<style scoped>
.grid {
  white-space:nowrap;
}

.grid a {
  display:inline-block;

}
</style>
