<template>
  <article>
    <h1 v-if="!success">Create category</h1>
    <h1 v-else>Category created</h1>
    <form v-if="!success">
      <label for="postTitle">Title</label>
      <input v-model="postTitle" type="text" name="postTitle" id="postTitle" />
      <label for="categorySlug">Category Slug</label>
      <input
        v-model="categorySlug"
        type="text"
        name="categorySlug"
        id="categorySlug"
      />
      <label for="postStatus">Post Status</label>
      <input
        v-model="postStatus"
        type="text"
        name="postStatus"
        id="postStatus"
      />
      <label for="type">Type</label>
      <input v-model="type" type="text" name="type" id="type" />
      <button
        type="submit"
        id="Login"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        <span v-if="!buttonDisabled">Create Articl</span>
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

export default {
  name: "CreateArticlPage",
  components: {
    CardNotification,
  },
  data() {
    return {
      categorySlug: "",
      order: 0,
      postStatus: "",
      postTitle: "",
      success: false,
      result: "",
    };
  },
  methods: {
    resetFormErrors() {
      this.success = false;
      this.result = null;
    },
    checkForm() {
      this.resetFormErrors();
      let passed = true;
      if (!this.postTitle) {
        this.errorMessage = "Please enter a title.";
        passed = false;
      } else if (!this.categorySlug) {
        this.errorMessage = "Please enter a slug.";
        passed = false;
      } else if (!this.postStatus) {
        this.errorMessage = "Please eelect a post status.";
        passed = false;
      } else if (!this.type) {
        this.type = "Please select a type.";
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
          url: "/categories",
          data: {
            title: this.title,
            slug: this.slug,
            description: this.description,
            parentSlug: this.parentSlug,
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
  },
};
</script>

<style scoped>
.success {
  border: 8px solid green;
  background-color: honeydew;
}
</style>
