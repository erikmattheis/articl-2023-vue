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
      <div class="row">
        <div class="col-xl">
          <div align="center">
            <h1><b>Welcome to your extracting board Naveen</b></h1>
            <br />

            <button
              type="button"
              :aria-busy="buttonDisabled"
              @click.prevent="fetchData()"
            >
              FETCH DATA
            </button>
          </div>
          <br />
          <table width="100%">
            <tr onclick="copyToClipboard(1)">
              <td>Article Title</td>
              <td>
                <div id="title"></div>
              </td>
            </tr>
            <tr onclick="copyToClipboard(2)">
              <td>Authors</td>
              <td>
                <div id="authors"></div>
              </td>
            </tr>
            <tr onclick="copyToClipboard(3)">
              <td>Affiliation</td>
              <td>
                <div id="affiliation"></div>
              </td>
            </tr>
            <tr onclick="copyToClipboard(4)">
              <td>Journal</td>
              <td>
                <div id="journal"></div>
              </td>
            </tr>
            <tr onclick="copyToClipboard(5)">
              <td>Pubblication Year</td>
              <td>
                <div id="year"></div>
              </td>
            </tr>
            <tr onclick="copyToClipboard(6)">
              <td>Pubblication Month</td>
              <td>
                <div id="month"></div>
              </td>
            </tr>
            <tr onclick="copyToClipboard(7)">
              <td>Abstract</td>
              <td>
                <div id="abstract"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
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
    };
  },
  methods: {
    async fetchData() {
      if (this.articlUrl) {
        try {
          this.buttonDisabled = true;
          const result = await fetchData(this.articlUrl);
          console.log(result);
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