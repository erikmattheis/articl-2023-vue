<template>
  <ul class="articl-actions">
    <li>
      <router-link :to="{ name: 'editCategory', params: { passedId: id } }">
        edit
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'deleteCategory', params: { id, title } }">
        delete
      </router-link>
    </li>
    <li class="handle">
      <a href="#"><div class="sr">Reorder category</div>
        <vue-feather
          alt="reorder category"
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
