<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'editCategory', params: { id } }">
          edit
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'deleteCategory', params: { id, title } }">
          delete
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  name: 'CategoryActions',
  components: {
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
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
