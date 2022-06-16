<template>
  <section>
    <template v-if="!isLoading">
      <form>
        <label for="fullText">Note
          <textarea
            id="fullText"
            v-model="fullText"
            name="fullText"
            autocomplete="off"
          />
        </label>

        <label for="status">Status
          <select
            id="status"
            v-model="status"
            name="status"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Pending">Pending</option>
            <option value="Trash">Trash</option>
          </select>
        </label>

        <button
          type="button"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm(id)"
        >
          {{ !id ? "Create" : "Edit" }} Note
        </button>
      </form>
    </template>
    <transition
      name="fade"
      mode="out-in"
    >
      <article-placeholder v-if="isLoading" />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";

export default {
  name: "NoteCrudComponent",
  components: {
    ArticlePlaceholder,
  },
  props: {
    passedId: {
      default: "",
      type: String,
    },
  },
  emits: ["view-mode"],
  data: () => {

    return {
      fullText: "",
      status: "Published",
      buttonDisabled: false,
      formAction: undefined,
      isLoading: true,
      id: undefined,
      slug: undefined,
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },
  mounted() {

    this.id = this.passedId;

    console.log("id is", this.id);

    this.formAction = this.id ? "Edit" : "Create";

    if (!this.id) {

      this.isLoading = false;

    } else {

      this.getCurrentNote(this.id);

    }

  },
  methods: {
    async getCurrentNote(id) {

      try {

        this.isLoading = true;

        const result = await this.getNote(id);

        Object.assign(this, result.data);

        this.isLoading = false;

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },
    resetFormErrors() {

      this.errorMessage = "";

    },
    checkForm() {

      this.resetFormErrors();

      let passed = true;

      if (this.title === "") {

        this.errorMessage = "Please enter a title.";

        passed = false;

      } else if (this.status === "") {

        this.errorMessage = "Please choose a status.";

        passed = false;

      }

      return passed;

    },
    async submitForm(id) {

      console.log("submitting", id);

      try {

        this.resetFormErrors();

        if (this.checkForm() === true) {

          this.buttonDisabled = true;

          const verb = id ? "PUT" : "POST";

          await this.$http({
            method: verb,
            url: `/notes/${id}`,
            data: {
              fullText: this.fullText,
              slug: this.slug,
              status: this.status,
            },
          });

          this.buttonDisabled = false;

          this.$emit("view-mode", id);

        } else {

          this.$store.dispatch("errors/setError", this.errorMessage);

        }

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },

    async getNote(id) {

      return this.$http({
        method: "GET",
        url: `/notes/${id}`,
      });

    },
  },
};
</script>

<style scoped>
form input.another {
  padding-right: 4.6 rem;
}
form input.another button {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.4rem;
}
</style>
