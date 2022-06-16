<template>
  <article class="placeholder-item">
    <div class="placeholder-col-12">
      <div class="placeholder-row">
        <div
          class="big"
          :class="pickClass()"
        />

        <div class="placeholder-col-12 empty" />
        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />

        <div :class="pickClass()" />
      </div>
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
