<template>
  <li class="grid">
    <ul>
      <li>
        <router-link :to="{ name: 'categoryPage', params: { slug: category.slug } }">
          {{ category.title }}
        </router-link>
      </li>
    </ul>

    <category-actions
      v-if="isLoggedIn"
      :id="category.id"
      :title="category.title"
    />
  </li>
</template>

<script>
import CategoryActions from '@/components/layout/CategoryActions.vue';
import { isLoggedIn } from '@/services/tokensService';

export default {
  name: 'CategoriesListItem',
  components: {
    CategoryActions,
  },
  props: {
    category: {
      type: Object,
      default: undefined,
    },
  },
  data: () => {

    return {
      isLoading: false,
    };

  },

  computed: {
    isLoggedIn,
  },
  methods: {

  },
};

</script>

<style scoped>
.bg {
  background-color:#f00;
}
.handle-container {
  width: 1rem !important;
}

a {
  cursor: pointer;
}
</style>

