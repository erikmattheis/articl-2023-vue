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

      <label for="">Authors</label>
      <input v-model="authors" name="" id="" autocomplete="off" />

      <label for="">Affiliation</label>
      <input v-model="affiliation" name="" id="" autocomplete="off" />

      <label for="">Journal</label>
      <input v-model="journal" name="" id="" autocomplete="off" />

      <label for="">Publication Year</label>
      <input v-model="year" name="" id="" autocomplete="off" />

      <label for="">Publication Month</label>
      <input v-model="month" name="" id="" autocomplete="off" />

      <label for="">Abstract</label>
      <input v-model="abstract" name="" id="" autocomplete="off" />

      <label for="status">Status</label>
      <select v-model="status" name="status" id="status">
        <option value="Publish">Publish</option>
        <option value="Draft">Draft</option>
        <option value="Pending">Pending</option>
        <option value="Trash">Trash</option>
      </select>

      <label for="typeaheadQuery">Category slug</label>
      <typeahead
        src="/categories/titles"
        @update-value="onTypeaheadHit"
        :query="categorySlug"
      />

      <button
        type="button"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        CREATE ARTICL
      </button>
    </form>

    <card-notification
      v-else
      success-message="Articl Created"
    ></card-notification>
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
    onTypeaheadHit(slug) {
      this.categorySlug = slug;
    },
  },
};
</script>

<style scoped>
</style>