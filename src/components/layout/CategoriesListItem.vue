<template>
  <li class="grid">
    <div
      v-if="isLoggedIn&&category"
      class="handle handle-container"
    >
      <a href="#"><span class="sr">Reorder category</span>
        <vue-feather
          alt="reorder category"
          size="1rem"
          type="move"
          aria-label="move"
        />
      </a>
    </div>
    <ul>
      <li>
        <router-link :to="{ name: 'categoryPage', params: { slug: category.slug } }">
          {{ category.title }}
        </router-link>
      </li>
    </ul>
    <div v-if="isLoggedIn">
      <articl-actions
        :id="articl.id"
        :title="articl.title"
      />
    </div>
  </li>
</template>

<script>
import VueFeather from 'vue-feather';

import ArticlActions from '@/components/layout/ArticlActions.vue';
import { isLoggedIn } from '@/services/tokensService';

export default {
  name: 'CategoriesListItem',
  components: {
    VueFeather,
    ArticlActions,
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

.handle-container {
  width: 1rem !important;
}

a {
  cursor: pointer;
}
</style>

