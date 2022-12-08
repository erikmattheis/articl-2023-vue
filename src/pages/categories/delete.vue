<template>
  <article>
    <h1>Delete Category</h1>
    <p>Really delete "{{ title }}"?</p>
    <form>
      <button
        v-if="!!id"
        :aria-busy="buttonDisabled"
        @click="deleteCategory()"
      >
        Delete
      </button>
    </form>
  </article>
</template>

<script>
export default {
  name: "DeleteCategory",
  components: {
  },
  data: () => {

    return {
      buttonDisabled: false,
    };

  },
  mounted() {


  },
  methods: {
    async deleteCategory() {

      try {

        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$store.dispatch("modals/setSuccessTitle", "Deletion successful.");

        this.$store.dispatch(
          "modals/setSuccessMessage",
          `The category "${this.title}" has been permanently deleted.`,
        );

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.buttonDisabled = false;

      }

    },
    async submitDelete(id) {

      return this.$http({
        method: "DELETE",
        url: "/categories",
        data: {
          id,
        },
      });

    },
  },
};
</script>
