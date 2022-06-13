<template>
  <article>
    <h1 v-if="!success">
      {{ formAction }}  category {{ id }}
    </h1>
    <h1 v-else>
      Success
    </h1>
    <template v-if="isLoggedIn">
      <template v-if="!isLoading">
        <form v-if="!success">
          <label for="title">Title
            <input
              id="title"
              v-model="title"
              type="text"
              name="title"
            ></label>
          <label for="slug">Slug
            <input
              id="slug"
              v-model="slug"
              readonly
              type="text"
              name="slug"
            ></label>
          <label for="parentSlug">Parent slug
            <input
              id="parentSlug"
              v-model="parentSlug"
              type="text"
              name="parentSlug"
            ></label>

          <label for="description">Description
            <textarea
              id="description"
              name="description"
              rows="10"
              cols="70"
            /></label>
          <button
            type="submit"
            :aria-busy="buttonDisabled"
            @click.prevent="submitForm(id)"
          >
            <span v-if="!buttonDisabled">{{ formAction }} category</span>
          </button>
        </form>
        <template v-else>
          <card-notification success-message="Category created." />
          <a
            href
            @click="$router.go()"
            @keyup.enter="$router.go()"
          >Create another category</a>
        </template>
      </template>
      <article-placeholder v-else />
    </template>
    <please-log-in-alert v-else />
  </article>
</template>

<script>
import { mapGetters } from "vuex";

import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import pleaseLogInAlert from "@/components/layout/PleaseLogInAlert.vue";
import CardNotification from "@/components/ui/CardNotification.vue";

export default {
  name: "CreateCategoryPage",
  components: {
    CardNotification,
    ArticlePlaceholder,
    pleaseLogInAlert,
  },
  props: {
    passedId: {
      default: "",
      type: String,
    },
  },
  data: () => {

    return {
      id: "",
      title: null,
      description: null,
      parentSlug: null,
      oldSlug: null,
      isLoading: true,
      categories: [],
      formAction: "",
      buttonDisabled: false,
      errorMessage: "",
      success: false,
      result: null,
      chrs: 0,
    };

  },
  computed: {
    slug() {

      if (!this.title) {

        return "";

      }

      let str = this.title.replace(
        /\s/g,
        "-",
      );

      str = str.toLowerCase();

      return encodeURIComponent(str);

    },

    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
    }),

  },
  mounted() {

    this.parentSlug = this.$route.query.parentSlug;

    this.id = this.passedId;

    this.formAction = this.id ? "Edit" : "Create";

    if (this.id) {

      this.getCurrentCategory(this.id);

    }

  },
  params: {
    slug: String,
  },
  methods: {
    async getCurrentCategory(id) {

      this.isLoading = true;

      const result = await this.getCategory(id);

      Object.assign(this, result.data);

      this.oldSlug = result.slug;

      this.isLoading = false;

    },
    async getCategory(id) {

      return this.$http({
        method: "GET",
        url: `/categories/${id}`,
      });

    },
    resetFormErrors() {

      this.success = null;

      this.result = null;

      this.errorMessage = "";

    },
    checkForm() {

      this.resetFormErrors();

      let passed = true;

      if (!this.title) {

        this.titleInvalid = true;

        this.errorMessage = "Please enter a title.";

        passed = false;

      } else if (!this.slug) {

        this.slugInvalid = true;

        this.errorMessage = "Please enter a slug.";

        passed = false;

      } else if (!this.parentSlug) {

        this.parentIdInvalid = true;

        this.errorMessage = "Please eselect a parent category.";

        passed = false;

      }

      return passed;

    },
    async submitForm(id) {

      this.resetFormErrors();

      if (this.checkForm() === true) {

        this.buttonDisabled = true;

        const verb = id ? "PUT" : "POST";
        const data = {
          title: this.title,
          slug: this.slug,
          description: this.description,
          parentSlug: this.parentSlug,
        };

        if (id) {

          data.oldSlug = this.oldSlug;

        }

        const result = await this.$http({
          method: verb,
          url: `/categories/${id}`,
          data,
        });

        this.buttonDisabled = false;

        this.success = true;

        this.result = result.data;

      } else {

        this.$store.dispatch(
          "errors/setError",
          {
            message: this.errorMessage,
          },
        );

      }

    },
  },
};
</script>

<style scoped>
*[readonly] {
  cursor: not-allowed;
}

.success {
  border: 8px solid green;
  background-color: honeydew;
}
</style>
