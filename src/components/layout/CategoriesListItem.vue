<template>
  <li class="listitem nav">
    <div class="grid">
      <ul>
        <li role="link">
          <router-link
            :to="{ name: tabName, params: { slug: category.slug } }"
          >
            {{ category.title }}
          </router-link>
        </li>
      </ul>
      <category-actions
        v-if="isLoggedIn"
        :id="category.id"
        :title="category.title"
      />
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

import CategoryActions from "@/components/layout/CategoryActions.vue";

export default {
  name: "CategoriesListItem",

  components: {
    CategoryActions,
  },
  props: {
    category: {
      type: Object,
      default: undefined,
    },
    treeLevel: {
      type: Number,
      default: 0,
    },
    tabName: {
      type: String,
      default: "",
    },

  },

  data() {

    return {
      TabName: "",
    };

  },

  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },

  methods: {

  },
};

</script>

<style scoped lang="scss">

li {
  width:100%;
  overflow-x: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;

  a {
    cursor: pointer;
  }
  
  a:hover {
    background-color: $grey-300;
  }
}


</style>
