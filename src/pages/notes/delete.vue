<template>
  <notee>
    <h1>Delete Note</h1>
    <p>Really delete note that starts "{{ fullText.substring(0,40) }}..."?</p>
    <form>
      <button
        v-if="!!id"
        @click="deleteNote()"
      >
        Delete
      </button>
    </form>
  </notee>
</template>

<script>
export default {
  name: "DeleteNote",
  components: {
  },
  data: () => {

    return {
      id: undefined,
      title: "Nothing to delete",
    };

  },
  emots: ["edit-mode"],
  mounted() {

    if (this.$route.params?.id) {

      this.id = this.$route.params?.id;

      this.fullText = this.$route.params?.fullText;

    }

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

        this.a = false;

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
