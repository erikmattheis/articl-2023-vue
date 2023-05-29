<template>
  <article>
    <h1 v-if="!success">
      {{ formAction }} category
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
        <label for="title">HTML Title
          <input
            id="htmlTitle"
            v-model="htmlTitle"
            type="text"
            name="htmlTitle"></label>
        <button
          type="button"
          :aria-busy="aiButtonDisabled"
          @click.prevent="getAISummary">
          <span v-if="!aiButtonDisabled">{{ aiButtonMessage }}</span>
        </button>
        AISummaries.length: {{ AISummaries.length }}
        <div v-for="(summary, index) in AISummaries"
          :key="index">
          <input
            type="radio"
            :id="`summary${index}`"
            v-model="summary.message.content"
            :name="`summary${index}`">
          <label :for="`summary${index}`">{{ summary }}</label>
        </div>
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
    aiButtonMessage: "Get AI Summaries",
    categories: [],
    chrs: 0,
    description: null,
    AISummaries: [],
    AIError: null,
    errorMessage: "",
    formAction: "",
    isLoading: true,
    oldSlug: null,
    result: null,
    success: false,
    title: null,
    htmlTitle: null,
  }),
  computed: {
    aiButtonDisabled() {
      return this.buttonDisabled || this.isLoading;
    },
    slug() {
      if (!this.htmlTitle) {
        return "";
      }

      let str = this.htmlTitle.replace(
        /\s/g,
        "-",
      );

      str = str.toLowerCase();

      str = encodeURI(str);

      str = str.replace(/'/g, "%27");

      return str;
    },
    ...mapGetters({
      breadcrumbs: "resources/breadcrumbs",
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

    this.setTitleAndDescriptionMixin({
      titleHtml: `${this.formAction} Category`,
    });
  },
  methods: {
    async getCurrentCategory(id) {
      try {

        this.isLoading = true;

        const result = await this.getCategory(id);

        Object.assign(this, result.data);

        this.oldSlug = result.data.slug;

        this.getAISummary();

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
        params: {
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
      }
      if (!this.titleHtml) {
        this.titleHtmlInvalid = true;

        this.errorMessage = "Please enter a HTML title.";

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
    async getAISummaries() {
      console.log("getAISummary");
      return [
        {
          message: {
            role: "assistant",
            content: "Multimodality refers to the use of multiple modes or forms of communication, such as text, images, video, and audio, to convey meaning and create a richer and more engaging experience for the audience. It is the combination of different media and communication channels to enhance the effectiveness of communication. This approach recognizes that people process information in different ways and that using multiple modes can make the message more accessible and memorable. Multimodality is commonly used in digital media, but it can also be applied to other forms of communication, such as presentations, advertising, and education."
          },
          finish_reason: "stop",
          index: 0
        },
        {
          message: {
            role: "assistant",
            content: "Multimodality refers to the use of multiple modes or forms of communication to convey information or meaning. This can include the use of text, images, video, audio, and other forms of media to create a more engaging and interactive experience for the audience. Multimodality is often used in digital communication, such as websites, social media, and multimedia presentations, to enhance the effectiveness of the message being communicated."
          },
          finish_reason: "stop",
          index: 1
        }
      ];
      /*
            try {
              this.buttonDisabled = true;
              this.AIError = "";
      
              const data = {
                category: this.title,
                parentCategory: this.breadcrumbs[this.breadcrumbs.length - 1]?.title
              };
      
              const result = await axiosInstance({
                method: "POST",
                url: "/categories/ai-summary",
                data,
              });
              console.log("result", result.data.message, typeof result.data.message);
      
              if (result.data.message) {
                this.AIError = result.data.message;
              }
              else
                if (result.data?.status === 200 && result.data instanceof Array) {
                  this.AISummaries.push(...result.data);
                  console.log("this.AISummaries", this.AISummaries);
                  this.aiButtonMessage = "Get More AI Summaries";
                } else if (result.data?.message) {
                  this.AIError = result.data.message;
                } else {
                  this.AIError = "There was an error getting the AI summary.";
                }
            } catch (error) {
              console.log("getAISummary3", error);
              this.$store.dispatch("errors/setError", error);
            } finally {
              this.buttonDisabled = false;
            }
            */
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
            titleHtml: this.titleHtml,
            slug: this.slug,
            description: this.description,
            AISummaries: this.AISummaries,
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
