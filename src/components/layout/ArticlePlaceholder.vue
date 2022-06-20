<template>
  <article>
    <div class="box-placeholder">
      <h2 class="text line">r&nbsp;</h2>

      <ul class="nav-tabs">
        <li class="text line link">&nbsp;</li>
        <li class="text line">&nbsp;</li>
        <li class="text">&nbsp;</li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: "ArticlPlaceholder",
  methods: {
    pickClass: () => {

      const max = 6;
      const min = 2;

      return `placeholder-col-${2 * Math.floor(Math.random() * (max - min + 1) + min)}`;

    },
  },
};
</script>

<style scoped>
li {
  height: 1rem;
  text-indent:-999rem;
}
</style>
