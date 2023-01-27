<template>
  <div class="row-admin-box">
    <router-link
      role="button"
      :to="{ name: 'editArticl', params:{editId:id}}">
      <small>edit</small>
    </router-link>
    <router-link
      role="button"
      :to="{ name: 'deleteArticl', params: { id, title }}">
      <small>delete</small>
    </router-link>

    <a
      role="button"
      class="handle"
      href="#"><div class="sr">Reorder articl</div>
      <vue-feather
        size="0.7rem"
        type="move"
        aria-label="Drag to reorder" />
    </a>
  </div>
</template>

<script>
import VueFeather from 'vue-feather';

export default {
  name: 'ArticlActions',
  components: {
    VueFeather,
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
a {
  align-self: center;
  justify-self: center;
  border:0;
}
</style>
