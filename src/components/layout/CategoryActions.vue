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
      <a href="#"><span class="sr">Reorder category</span>
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
ul {
  list-style: none;
  background-color: #444;
  text-align: center;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  border: 1px solid #888;
  font-size: 0.8rem;
  vertical-align: middle;
}

a {
  text-decoration: none;
  display: block;
  padding: 0 0.5rem;
  transition: .3s background-color;

}

a:hover {
  background-color: #d4d4d4;
}

</style>
