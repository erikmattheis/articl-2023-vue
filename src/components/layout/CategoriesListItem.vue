<template>
  <li class="listitem ">
    <div class="grid">
      <ul>
        <li>
          <router-link :to="{ name: 'TabCategories', params: { slug: category.slug } }">
            {{ category.title }}
          </router-link>
        </li>
      </ul>
      <div>
        <admin-actions-category
          v-if="isLoggedIn"
          :id="category.id"
          :title="category.title"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

import AdminActionsCategory from "@/components/layout/AdminActionsCategory.vue";

export default {
  name: "CategoriesListItem",

  components: {
    AdminActionsCategory,
  },

  props: {
    category: {
      type: Object,
      default: undefined,
    },
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

<style scoped>

li {
  width:100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap
}

a {
  cursor: pointer;
}
</style>
