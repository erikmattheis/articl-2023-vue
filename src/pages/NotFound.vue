<template>
  <article>
    <article>
      <h1>Page not found</h1>
      <p>This page could not be found.</p>
    </article>
  </article>
</template>


  mounted() {
    this.setTitleAndDescription();
  },
  methods: {
    setTitleAndDescription() {
      const documentTitle = "Articl.net Forgot Password";
      const metaDescription = "";
      this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });
    },