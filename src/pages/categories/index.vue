<template>
  <article>
    <h1 v-if="!success">
      {{ formAction }}  category
    </h1>
    <h1 v-else>
      Success
    </h1>

    <template v-if="!isLoading">
      <form v-if="!success">
        <label for="title">Title
          <input
            id="title"
            v-model="title"
            type="text"
            name="title"></label>
        <button
          type="button"
          :aria-busy="aiButtonDisabled"
          @click.prevent="getAISummary">
          <span v-if="!aiButtonDisabled">Get AI Description</span>
        </button>
        <label for="AISummary">AI Summary
          <p v-if="AIError">{{ AIError }}</p>
          <textarea
            id="AISummary"
            v-model="AISummary"
            name="AISummary"
            rows="10"
            cols="70" /></label>
        <label for="description">Description
          <textarea
            id="description"
            v-model="description"
            name="description"
            rows="10"
            cols="70" /></label>
        <label for="slug">Slug
          <input
            id="slug"
            v-model="slug"
            readonly
            type="text"
            name="slug"></label>
        <label for="parentSlug">Parent slug
          <input
            id="parentSlug"
            v-model="parentSlug"
            type="text"
            name="parentSlug"></label>
        <button
          type="submit"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm(id)">
          <span v-if="!buttonDisabled">{{ formAction }} category</span>
        </button>
      </form>
      <template v-else>
        <card-notification success-message="Category created." />
        <a
          href
          @click="$router.go()"
          @keyup.enter="$router.go()">Create another category</a>
      </template>
    </template>
    <transition
      name="fade"
      mode="out-in">
      <loading-placeholder v-if="isLoading" />
    </transition>
  </article>
</template>

<script>

import { mapGetters } from "vuex";
import CardNotification from "@/components/ui/CardNotification.vue";
import LoadingPlaceholder from "@/components/ui/LoadingPlaceholder.vue";
import axiosInstance from "@/services/axiosService";

export default {
  name: "CreateCategoryPage",
  components: {
    CardNotification,
    LoadingPlaceholder,
  },
  data: () => ({
    buttonDisabled: false,
    categories: [],
    chrs: 0,
    description: null,
    AISummary: null,
    AIError: null,
    errorMessage: "",
    formAction: "",
    isLoading: true,
    oldSlug: null,
    result: null,
    success: false,
    title: null,
  }),
  computed: {
    aiButtonDisabled() {
      return this.buttonDisabled || this.isLoading;
    },
    slug() {
      if (!this.title) {
        return "";
      }

      let str = this.title.replace(
        /\s/g,
        "-",
      );

      str = str.toLowerCase();

      str = encodeURIComponent(str);

      str = str.replace(/'/g, "%27");

      return str;
    },
    ...mapGetters({
      breadcrumbs: "categoryPages/breadcrumbs",
    }),
  },
  mounted() {
    this.isLoading = false;
    this.parentSlug = this.$route.query.parentSlug;

    this.id = this.$route.params.id;

    this.formAction = this.id ? "Edit" : "Create";

    if (this.id) {
      this.getCurrentCategory(this.id);
    } else {
      this.isLoading = false;
    }

    this.setTitleAndDescriptionMixin({ title: this.formAction });
  },
  params: {
    id: String,
  },
  methods: {
    async getCurrentCategory(id) {
      try {
        this.isLoading = true;

        const result = await this.getCategory(id);

        Object.assign(this, result.data);

        this.slug = decodeURIComponent(this.slug);

        this.oldSlug = decodeURIComponent(result.data.slug);

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },
    async getCategory(id) {
      return axiosInstance({
        method: "GET",
        url: `/categories/${id}`,
      });
    },
    async getCategoryBySlug(slug) {
      return axiosInstance({
        method: "GET",
        url: "/categories/",
        oparams: {
          slug,
        },
      });
    },
    resetFormErrors() {
      this.success = null;
      this.result = null;
      this.errorMessage = "";
      this.AIError = "";
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

        this.errorMessage = "Please select a parent category.";

        passed = false;
      }

      return passed;
    },
    async getAISummary() {
      try {
        this.buttonDisabled = true;
        this.AIError = "";

        const data = {
          category: this.title,
          parentCategory: this.parentCategory,
        };

        const result = await axiosInstance({
          method: "POST",
          url: "/categories/ai-summary",
          data,
        });

        if (result.data?.status === 200) {
          this.AISummary = result.data;
        } else if (result.data?.message) {
          this.AIError = result.data.message;
        } else {
          this.AIError = "There was an error getting the AI summary.";
        }
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    async submitForm(id) {
      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const verb = id ? "PUT" : "POST";
          const possiblyEmtyId = id || "";
          const data = {
            title: this.title,
            slug: this.slug,
            description: this.description,
            AISummary: this.AISummary,
            parentSlug: this.parentSlug,
          };

          const titleVerb = id ? "Edited" : "Created";

          this.setTitleAndDescriptionMixin({ title: `Category ${titleVerb}` });

          if (id) {
            data.oldSlug = this.oldSlug;
          }

          await axiosInstance({
            method: verb,
            url: `/categories/${possiblyEmtyId}`,
            data,
          });

          this.success = true;

          this.$store.dispatch("modals/setSuccessTitle", `Category ${titleVerb}`);

          this.$store.dispatch(
            "modals/setSuccessMessage",
            `The category was successfully ${titleVerb}.`,
          );
          if (Number(this.parentSlug) === 0) {
            this.$router.push({ name: "homePage" });
          } else {
            this.$router.push({ name: "categoryPage", params: { slug: this.parentSlug } });
          }
        } else {
          this.$store.dispatch("errors/setError", this.errorMessage);
        }
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    removePunctuation(str) {
      return str.replace(/[^\w\s']|_/g, "").replace(/\s+/g, " ");
    },

  },
};
</script>
