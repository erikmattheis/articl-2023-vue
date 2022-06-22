<template>
  <article>
    <div class="box-placeholder">
      <h2 class="text-p line">
        r&nbsp;
      </h2>

      <ul class="nav-tabs">
        <li class="text-p line link">
&nbsp;
        </li>
        <li class="text-p line">
&nbsp;
        </li>
        <li class="text-p">
&nbsp;
        </li>
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
h2,
li {
  height: 1rem;
  text-indent:-999rem;
}
</style>
