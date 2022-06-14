<template>
  <section>
    <h3 v-if="!success">{{ formAction }} note</h3>

    <h1 v-else>Success</h1>

    <template v-if="!isLoading">
      <form v-if="!success">
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
      <template v-else>
        <card-notification success-message="Success" />
        <a
          href
          @click="$router.go()"
          @keyup.enter="$router.go()"
        >Create another note</a>
      </template>
    </template>
    <article-placeholder v-else />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import cardNotification from "@/components/ui/CardNotification.vue";
import { fetchData } from "@/services/fetchingService";

export default {
  name: "NoteCrudComponent",
  components: {
    ArticlePlaceholder,
    cardNotification,
  },
  props: {
    passedId: {
      default: "",
      type: String,
    },
    slug: {
      default: "",
      type: String,
    },
  },
  data: () => {

    return {
      fullText: "",
      status: "Published",
      success: false,
      buttonDisabled: false,
      formAction: undefined,
      isLoading: true,
      id: undefined,
    };

  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),
  },
  mounted() {

    this.id = this.passedId;

    this.formAction = this.id ? "Edit" : "Create";

    if (!this.id) {

      this.isLoading = false;

    } else {

      this.getCurrentNote(this.id);

    }

  },
  methods: {
    async getCurrentNote(id) {

      this.isLoading = true;

      const result = await this.getNote(id);

      Object.assign(this, result.data);

      this.isLoading = false;

    },
    async getData() {

      if (this.noteUrl) {

        try {

          this.buttonDisabled = true;

          const result = await fetchData(this.noteUrl);

          if (result) {

            Object.assign(this, result);

            this.success = true;

          }

        } catch (error) {

          this.$store.dispatch("errors/setError", error);

        } finally {

          this.isLoading = false;

          this.buttonDisabled = false;

        }

      } else {

        this.$store.dispatch("errors/setError", "Please enter a URL");

      }

    },
    resetFormErrors() {

      this.success = null;

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

      this.resetFormErrors();

      if (this.checkForm() === true) {

        this.buttonDisabled = true;

        const verb = id ? "PUT" : "POST";
        const result = await this.$http({
          method: verb,
          url: `/notes/${id}`,
          data: {
            fullText: this.fullText,
            slug: this.slug,
            status: this.status,
          },
        });

        this.buttonDisabled = false;

        this.success = true;

        Object.assign(this, result.data);

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
