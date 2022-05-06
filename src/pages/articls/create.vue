<template>
  <article>
    <h1 v-if="!success">Create articl</h1>
    <h1 v-else>Articl created</h1>
    <form v-if="!success">
      <label for="articlUrl">URL</label>
      <input v-model="articlUrl" type="text" name="articlUrl" id="articlUrl" />

      <button
        type="button"
        :aria-busy="buttonFetchDisabled"
        @click.prevent="getData()"
      >
        FETCH DATA
      </button>

      <label for="">Title</label>
      <input v-model="title" name="" id="" autocomplete="off" />

      <label for="authors">Authors</label>
      <input v-model="authors" name="authors" id="authors" autocomplete="off" />

      <label for="affiliation">Affiliation</label>
      <input
        v-model="affiliation"
        name="affiliation"
        id="affiliation"
        autocomplete="off"
      />

      <label for="journal">Journal</label>
      <input v-model="journal" name="journal" id="journal" autocomplete="off" />

      <label for="">Publication Year</label>
      <input v-model="year" name="year" id="year" autocomplete="off" />

      <label for="">Publication Month</label>
      <input v-model="month" name="month" id="month" autocomplete="off" />

      <label for="">Abstract</label>
      <input
        v-model="abstract"
        name="abstract"
        id="abstract"
        autocomplete="off"
      />

      <label for="type">Link type</label>
      <select v-model="type" name="type" id="type" autocomplete="off">
        <optgroup value="Resources">
          <option value="Review (OA)">Review (OA)</option>
          <option value="Review (OA)">Review (PA)</option>
          <option value="Research (OA)">Research (OA)</option>
          <option value="Research (PA)">Research (PA)</option>
          <option value="Web">Web</option>
          <option value="on-medical journal articles">
            Non-medical journal articles
          </option>
          <option value="Images">Images</option>
          <option value="Presentations">Presentations</option>
          <option value="Videos">Videos</option>
          <option value="Podcast">Podcast</option>
        </optgroup>
      </select>

      <label for="status">Status</label>
      <select v-model="status" name="status" id="status">
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
        <option value="Pending">Pending</option>
        <option value="Trash">Trash</option>
      </select>

      <label for="typeaheadQuery">Category slug</label>
      <typeahead
        src="/categories/titles"
        @update-value="onTypeaheadHit"
        query="categorySlug"
      />

      <button
        type="button"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        CREATE ARTICL
      </button>
    </form>
    <template v-else>
      <card-notification success-message="Articl Created"></card-notification>
      <a href @click="$router.go()">Create another articl</a>
    </template>
  </article>
</template>
<script>
import CardNotification from "@/components/ui/CardNotification.vue";
import typeahead from "@/components/ui/InputTypeahead.vue";
import { fetchData } from "@/services/fetchingService";

export default {
  name: "createArticlPage",
  components: {
    CardNotification,
    typeahead,
  },
  data() {
    return {
      abstract: "",
      affiliation: "",
      articlUrl: "",
      authors: "",
      buttonDisabled: false,
      buttonFetchDisabled: false,
      categorySlug: "",
      journal: "",
      month: "",
      status: "Publish",
      success: false,
      title: "",
      type: "",
      year: "",
    };
  },
  mounted() {
    this.categorySlug = this.$route.query.slug;
  },
  methods: {
    async getData() {
      if (this.articlUrl) {
        try {
          this.buttonFetchDisabled = true;
          const result = await fetchData(this.articlUrl);
          Object.assign(this, result);
        } catch (error) {
          this.$store.dispatch("setError", error);
        } finally {
          this.buttonFetchDisabled = false;
        }
      } else {
        this.$store.dispatch("setError", "Please enter a URL");
      }
    },
    setTitleAndDescription() {
      const documentTitle = "Articl.net Registration";
      const metaDescription = "";
      this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
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

      if (!this.title === "") {
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
    async submitForm() {
      this.resetFormErrors();
      if (this.checkForm() === true) {
        this.buttonDisabled = true;
        this.$http({
          method: "POST",
          url: "/articls",
          data: {
            abstract: this.abstract,
            affiliation: this.affiliation,
            articlUrl: this.articlUrl,
            type: this.type,
            authors: this.authors,
            categorySlug: this.categorySlug,
            journal: this.journal,
            month: this.month,
            status: this.status,
            title: this.title,
            year: this.year,
          },
        })
          .then((result) => {
            if (result.data) {
              this.success = true;
              this.result = result.data;
            }
          })
          .catch((error) => {
            this.$store.dispatch("setError", error);
          })
          .finally(() => {
            this.buttonDisabled = false;
          });
      } else {
        this.$store.dispatch("setError", {
          message: this.errorMessage,
        });
      }
    },
    onTypeaheadHit(e) {
      this.categorySlug = e.value.value;
    },
  },
};
</script>

<style scoped>
form input.another {
  padding-right: 4.6em;
}
form input.another button {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.4em;
}
</style>