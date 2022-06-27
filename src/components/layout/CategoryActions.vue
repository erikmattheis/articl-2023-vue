<template>
  <div class="admin grid">
    <router-link
      :to="{ name: 'editCategory', params: { passedId: id } }"
      role="button"
    >
      edit
    </router-link>

    <router-link
      :to="{ name: 'deleteCategory', params: { id, title } }"
      role="button"
    >
      delete
    </router-link>

    <a
      class="handle"
      href="#"
    ><div class="sr">Reorder category</div>
      <vue-feather
        alt="reorder category"
        size="1rem"
        type="move"
        aria-label="move"
      />
    </a>
  </div>
</template>

<script>
import VueFeather from "vue-feather";

export default {
  name: "CategoryActions",
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

  },
};
</script>
