<template>
  <article>
    <h1 v-if="!success">
      {{ formAction }}  category {{ id }}
    </h1>
    <h1 v-else>
      Success
    </h1>
    <template v-if="isLoggedIn">
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
    <p v-else>
      Please <a href="/login?reditect=/categories">log in</a> to continue.
    </p>
  </article>
</template>

<script>
import CardNotification from '@/components/ui/CardNotification.vue';
import { isLoggedIn } from '@/services/tokensService';

export default {
  name: 'CreateCategoryPage',
  components: {
    CardNotification,
  },
  props: {
    passedId: {
      default: '',
      type: String,
    },
  },
  data: () => {

    return {
      id: '',
      title: null,
      description: null,
      parentSlug: null,
      categories: [],
      formAction: '',
      buttonDisabled: false,
      errorMessage: '',
      success: false,
      result: null,
      chrs: 0,
    };

  },
  computed: {
    slug() {

      if (!this.title) {

        return '';

      }

      let str = this.title.replace(
        /\s/g,
        '-',
      );

      str = str.toLowerCase();

      return encodeURIComponent(str);

    },
    isLoggedIn,
  },
  mounted() {

    this.parentSlug = this.$route.query.parentSlug;

    this.id = this.passedId;

    this.formAction = this.id ? 'Edit' : 'Create';

    if (this.id) {

      this.getCurrentCategory(this.id);

    }

  },
  params: {
    slug: String,
  },
  methods: {
    async getCurrentCategory(id) {

      this.buttonDisabled = true;

      const result = await this.getCategory(id);

      console.log(result);

      Object.assign(this, result.data);

      this.buttonDisabled = false;

    },
    async getCategory(id) {

      return this.$http({
        method: 'GET',
        url: `/categories/${id}`,
      });

    },
    resetFormErrors() {

      this.success = null;

      this.result = null;

      this.errorMessage = '';

    },
    checkForm() {

      this.resetFormErrors();

      let passed = true;

      if (!this.title) {

        this.titleInvalid = true;

        this.errorMessage = 'Please enter a title.';

        passed = false;

      } else if (!this.slug) {

        this.slugInvalid = true;

        this.errorMessage = 'Please enter a slug.';

        passed = false;

      } else if (!this.parentSlug) {

        this.parentIdInvalid = true;

        this.errorMessage = 'Please eselect a parent category.';

        passed = false;

      }

      return passed;

    },
    async submitForm(id) {

      this.resetFormErrors();

      if (this.checkForm() === true) {

        this.buttonDisabled = true;

        const verb = id ? 'PUT' : 'POST';
        const result = await this.$http({
          method: verb,
          url: '/categories',
          data: {
            title: this.title,
            slug: this.slug,
            description: this.description,
            parentSlug: this.parentSlug,
          },
        });

        this.buttonDisabled = false;

        this.success = true;

        this.result = result.data;

      } else {

        this.$store.dispatch(
          'errors/setError',
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
