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
      <label for="author">Type</label>
      <input v-model="author" type="text" name="author" id="author" />

      <label for="abstract">Abstract</label>
      <input v-model="abstract" type="text" name="abstract" id="abstract" />

      <label for="authors">Authors</label>
      <input v-model="authors" type="text" name="authors" id="authors" />

      <label for="type">Type</label>
      <input v-model="type" type="text" name="type" id="type" />

      <label for="type">Type</label>
      <input v-model="type" type="text" name="type" id="type" />

      <label for="type">Type</label>
      <input v-model="type" type="text" name="type" id="type" />

      <label for="type">Type</label>
      <input v-model="type" type="text" name="type" id="type" />

      <label for="type">Type</label>
      <input v-model="type" type="text" name="type" id="type" />

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
  name: "createArticlPage",
  components: {
    CardNotification,
  },
  data() {
    return {
      success: false,
      result: "",
      buttonDisabled: "",
      author: {
        type: String,
        required: true,
        trim: true,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
      categorySlug: {
        type: String,
        required: true,
        trim: true,
      },
      order: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
      },
      postId: {
        type: String,
        required: true,
        trim: true,
      },
      postStatus: {
        type: String,
        required: true,
        trim: true,
      },
      postTitle: {
        type: String,
        required: true,
        trim: true,
      },
      postType: {
        type: String,
        required: false,
        trim: true,
      },
      abstract: {
        type: String,
        required: false,
        trim: true,
      },
      authors: { type: String, required: false, trim: true },
      city: { type: String, required: false, trim: true },
      country: { type: String, required: false, trim: true },
      dateEnd: { type: String, required: false, trim: true },
      dateStart: { type: String, required: false, trim: true },
      description: {
        type: String,
        required: false,
        trim: true,
      },
      fullText: { type: String, required: false, trim: true },
      type: {
        type: String,
        required: false,
        trim: true,
      },
      year: {
        type: Number,
        required: false,
        trim: true,
      },
      thumbnailImage: {
        type: String,
        required: false,
        trim: true,
      },
      url: {
        type: String,
        required: false,
        trim: true,
      },
      venue: {
        type: String,
        required: false,
        trim: true,
      },
      imageCaption: {
        type: String,
        required: false,
        trim: true,
      },
      imageLocalPath: {
        type: String,
        required: false,
        trim: true,
      },
      imageOriginalUrl: {
        type: String,
        required: false,
        trim: true,
      },
      imageRemotePath: {
        type: String,
        required: false,
        trim: true,
      },
      institution: {
        type: String,
        required: false,
        trim: true,
      },
      journal: {
        type: String,
        required: false,
        trim: true,
      },
      month: {
        type: String,
        required: false,
        trim: true,
      },
      resourceType: {
        type: String,
        required: false,
        trim: true,
      },
      reviewSource: {
        type: String,
        required: false,
        trim: true,
      },
      reviewUrl: {
        type: String,
        required: false,
        trim: true,
      },
      shortTitle: {
        type: String,
        required: false,
        trim: true,
      },
      source: {
        type: String,
        required: false,
        trim: true,
      },
      sourceId: {
        type: String,
        required: false,
        trim: true,
      },
      sourceIdType: {
        type: String,
        required: false,
        trim: true,
      },
      startDate: {
        type: String,
        required: false,
        trim: true,
      },
      state: {
        type: String,
        required: false,
        trim: true,
      },
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
