<template>
  <main>
    <h3>Children: {{ categories.length }}</h3>
    <nav>
      <ul>
        <li v-for="category in categories" :key="category.slug">
          <router-link to="/d/:category.slug">
            {{ category.title }}
          </router-link>
          <router-link to="/categories"> New Category Here </router-link>
          <router-link to="/articls/create"> New Articl Here </router-link>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
};
</script>

<style scoped>
articl nav {
  overflow: auto;
}
</style>
