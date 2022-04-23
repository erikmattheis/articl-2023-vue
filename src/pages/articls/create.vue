<template>
  <article>
    <h1 v-if="!success">Create category</h1>
    <h1 v-else>Category created</h1>
    <form v-if="!success">
      <label for="articlUrl1">URL</label>
      <input
        v-model="articlUrl"
        type="text"
        name="articlUrl1"
        id="articlUrl1"
      />

      <button
        type="button"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        FETCH DATA
      </button>

      <label for="">Article Title</label>
      <input v-model="title" name="" id="" autocomplete="off" />

      <label for="">Authors</label>
      <input v-model="authors" name="" id="" autocomplete="off" />

      <label for="">Affiliation</label>
      <input v-model="affiliation" name="" id="" autocomplete="off" />

      <label for="">Journal</label>
      <input v-model="journal" name="" id="" autocomplete="off" />

      <label for="">Pubblication Year</label>
      <input v-model="year" name="" id="" autocomplete="off" />

      <label for="">Pubblication Month</label>
      <input v-model="month" name="" id="" autocomplete="off" />

      <label for="">Abstract</label>
      <input v-model="abstract" name="" id="" autocomplete="off" />
    </form>
    <card-notification
      v-else
      success-message="Articl Created"
    ></card-notification>
  </article>
</template>
<script>
import CardNotification from "@/components/ui/CardNotification.vue";
import { fetchData } from "@/services/fetchingService";

export default {
  name: "createArticlPage",
  components: {
    CardNotification,
  },
  data() {
    return {
      buttonDisabled: false,
      success: false,
      articlUrl: "",
      title: "",
      authors: "",
      affiliation: "",
      journal: "",
      year: "",
      month: "",
      abstract: "",
    };
  },
  methods: {
    async submitForm() {
      const results = await this.getData();
      console.log("await", results);
    },
    async getData() {
      if (this.articlUrl) {
        try {
          this.buttonDisabled = true;
          const result = await fetchData(this.articlUrl);
          Object.assign(this, result);
          console.log("result needed", result);
          return result;
        } catch (error) {
          this.$store.dispatch("setError", error);
        } finally {
          this.buttonDisabled = false;
        }
      } else {
        this.$store.dispatch("setError", "Please enter a URL");
      }
    },
  },
};
</script>

<style scoped>
</style>