<template>
  <article>
    <h1>Delete Note{{ id }}</h1>
    <p>Really delete note that starts "{{ fullText.substring(0,40) }}..."?</p>
    <form>
      <button
        v-if="!!id"
        @click="deleteNote()"
      >
        Delete
      </button>
    </form>
  </article>
</template>

<script>
export default {
  name: "DeleteNote",
  props: {
    fullText: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  data: () => {

  },
  mounted() {

  },
  methods: {
    async deleteNote() {

      try {

        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$store.dispatch("modals/setSuccessTitle", "Deletion successful.");

        this.$store.dispatch(
          "modals/setSuccessMessage",
          `The note "${this.title}" has been permanently deleted.`,
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
        url: "/notes",
        data: {
          id,
        },
      });

    },
  },
};
</script>
