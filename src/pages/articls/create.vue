<template>
  <article>
    <h1 v-if="!success">
      {{ formAction }} articl
    </h1>
    <h1 v-else>
      Success
    </h1>

    <template v-if="!isLoading">
      <form v-if="!success">
        <template v-if="!id">
          <label for="articlUrl">URL
            <input
              id="articlUrl"
              v-model="articlUrl"
              type="text"
              name="articlUrl"
            ></label>

          <button
            type="button"
            :aria-busy="buttonFetchDisabled"
            @click.prevent="getData()"
          >
            FETCH DATA
          </button>
        </template>
        <label for="title">Title
          <input
            id="title"
            v-model="title"
            name="title"
            autocomplete="off"
          >
        </label>

        <label for="authors">Authors
          <input
            id="authors"
            v-model="authors"
            name="authors"
            autocomplete="off"
          ></label>

        <label for="affiliation">Affiliation
          <input
            id="affiliation"
            v-model="affiliation"
            name="affiliation"
            autocomplete="off"
          ></label>

        <label for="journal">Journal
          <input
            id="journal"
            v-model="journal"
            name="journal"
            autocomplete="off"
          ></label>

        <label for="year">Publication Year
          <input
            id="year"
            v-model="year"
            name="year"
            autocomplete="off"
          ></label>

        <label for="month">Publication Month
          <input
            id="month"
            v-model="month"
            name="month"
            autocomplete="off"
          ></label>

        <label for="abstract">Abstract
          <input
            id="abstract"
            v-model="abstract"
            name="abstract"
            autocomplete="off"
          ></label>

        <label for="type">Link type
          <select
            id="type"
            v-model="type"
            name="type"
            autocomplete="off"
          >
            <optgroup value="Resources">
              <option value="Review (OA)">
                Review (OA)
              </option>
              <option value="Review (OA)">
                Review (PA)
              </option>
              <option value="Research (OA)">
                Research (OA)
              </option>
              <option value="Research (PA)">
                Research (PA)
              </option>
              <option value="Web">
                Web
              </option>
              <option value="on-medical journal articles">
                Non-medical journal articles
              </option>
              <option value="Images">
                Images
              </option>
              <option value="Presentations">
                Presentations
              </option>
              <option value="Videos">
                Videos
              </option>
              <option value="Podcast">
                Podcast
              </option>
            </optgroup>
          </select></label>

        <label for="status">Status
          <select
            id="status"
            v-model="status"
            name="status"
          >
            <option value="Published">
              Published
            </option>
            <option value="Draft">
              Draft
            </option>
            <option value="Pending">
              Pending
            </option>
            <option value="Trash">
              Trash
            </option>
          </select></label>

        <input-typeahead
          src="/categories/titles"
          query="category"
          :input-value="slug"
          label-value="Category slug"
          @update-value="onTypeaheadHit"
          @keyup="onTypeaheadHit"
        />
        <button
          type="button"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm(id)"
        >
          {{ !id ? "Create" : "Edit" }} Articl
        </button>
      </form>
      <template v-else>
        <card-notification success-message="Success" />
        <a
          href
          @click="$router.go()"
          @keyup.enter="$router.go()"
        >Create another article</a>
      </template>
    </template>
    <transition
      name="fade"
      mode="out-in"
    >
      <article-placeholder v-if="isLoading" />
    </transition>
  </article>
</template>

<script>
import ArticlePlaceholder from "@/components/layout/ArticlePlaceholder.vue";
import cardNotification from "@/components/ui/CardNotification.vue";
import inputTypeahead from "@/components/ui/InputTypeahead.vue";
import { fetchData } from "@/services/fetchingService";
import { setTitleAndDescription } from "@/services/htmlMetaService";

export default {
  name: "EditArticlPage",
  components: {
    ArticlePlaceholder,
    cardNotification,
    inputTypeahead,
  },
  props: {
    passedId: {
      default: "",
      type: String,
    },
  },
  data() {

    return {
      abstract: "",
      affiliation: "",
      id: "",
      articlUrl: "",
      authors: "",
      buttonDisabled: false,
      buttonFetchDisabled: false,
      slug: this.$route.query.slug,
      formAction: "",
      isLoading: true,
      journal: "",
      month: "",
      status: "Published",
      success: false,
      title: "",
      type: "Review (OA)",
      year: "",
    };

  },
  mounted() {

    this.id = this.passedId;

    this.formAction = this.id ? "Edit" : "Create";

    if (!this.id) {

      this.slug = this.$route.query.slug;

      this.onTypeaheadHit({
        value: this.slug,
      });

      this.isLoading = false;

    } else {

      this.getCurrentArticl(this.id);

    }

    setTitleAndDescription({
      title: this.formAction,
    });

  },
  methods: {
    async getCurrentArticl(id) {

      try {

        this.isLoading = true;

        const result = await this.getArticl(id);

        Object.assign(this, result.data);

        this.isLoading = false;

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      }

    },
    async getData() {

      if (this.articlUrl) {

        try {

          this.buttonFetchDisabled = true;

          const result = await fetchData(this.articlUrl);

          if (result) {

            Object.assign(this, result);

          }

        } catch (error) {

          this.$store.dispatch("errors/setError", error);

        } finally {

          this.buttonFetchDisabled = false;

        }

      } else {

        this.$store.dispatch("errors/setError", "Please enter a URL");

      }

    },
    resetFormErrors() {

      this.success = null;

      this.result = null;

      this.errorMessage = "";

    },
    checkForm() {

      this.resetFormErrors();

      let passed = true;

      if (this.title === "") {

        this.errorMessage = "Please enter a title.";

        passed = false;

      } else if (this.authors === "") {

        this.errorMessage = "Please enter author names.";

        passed = false;

      } else if (this.type === "") {

        this.errorMessage = "Please enter a type.";

        passed = false;

      } else if (this.status === "") {

        this.errorMessage = "Please choose a status.";

        passed = false;

      }

      return passed;

    },
    async submitForm(id) {

      try {

        this.resetFormErrors();

        if (this.checkForm() === true) {

          this.buttonDisabled = true;

          const verb = id ? "PUT" : "POST";
          const result = await this.$http({
            method: verb,
            url: `/articls/${id}`,
            data: {
              abstract: this.abstract,
              affiliation: this.affiliation,
              articlUrl: this.articlUrl,
              type: this.type,
              authors: this.authors,
              slug: this.slug,
              journal: this.journal,
              month: this.month,
              status: this.status,
              title: this.title,
              year: this.year,
            },
          });

          this.success = true;

          Object.assign(this, result.data);

        } else {

          this.$store.dispatch("errors/setError", this.errorMessage);

        }

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.buttonDisabled = false;

      }

    },

    async getArticl(id) {

      return this.$http({
        method: "GET",
        url: `/articls/${id}`,
      });

    },
    onTypeaheadHit(e) {

      this.slug = e.value;

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
