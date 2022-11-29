<template>
  <footer>
    <article>
      &copy;<span class="copyright">{{ year }} Articl, LLC</span>
    </article>
  </footer>
</template>

<script>
export default {
  data: () => {

    return {
      year: "",
    };

  },
  created() {

    this.year = new Date().getFullYear();

  },
};
</script>
