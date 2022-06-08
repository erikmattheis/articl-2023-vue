<template>
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
import VueFeather from 'vue-feather';

export default {
  name: 'CategoryActions',
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
li {
  display: inline-block;
  border: 1px solid #888;
  border-right: 0px;
  font-size: 0.8rem;
  vertical-align: middle;
}

li:last-child {
  border-right: 1px solid #888;
}

a {
  text-decoration: none;
  height: 1.6rem;
  padding: 0 0.5rem;
  transition: background-color .3s ;
  display:flex;justify-content:center;align-items:center;
}

a:hover {
  background-color: #d4d4d4;
}

</style>
