<template>
  <article>
    <h1 v-if="!success">
      {{ formAction }} Note
    </h1>
    <template v-else>
      <h1>Note Created</h1>
      <ul>
        <li>
          <a
            tabindex="0"
            href
            @click.prevent="$router.go()"
            @keyup.enter.prevent="$router.go()">Create another note in the same category</a>
        </li>
        <li>
          <a
            tabindex="0"
            href
            @click.prevent="$router.push(`/resource/${ slug }/notes`)"
            @keyup.enter.prevent="$router.push(`/resource/${ slug }/notes`)">Return to Category Page </a>
        </li>
      </ul>
    </template>
    <template v-if="!isLoading && !success">
      <form>
        <label for="fullText">
          <textarea
            id="fullText"
            v-model="fullText"
            name="fullText" /></label>

        <button
          type="button"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm(id)">
          {{ !id ? "Create" : "Edit" }} Note
        </button>
      </form>
    </template>
    <transition
      name="fade"
      mode="out-in">
      <loading-placeholder v-if="isLoading" />
    </transition>
  </article>
</template>

<script>
import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';
import axiosInstance from '@/services/axiosService';

export default {
  name: 'EditNotePage',
  components: {
    LoadingPlaceholder,
  },

  props: {
    editId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      id: '',
      fullText: '',
    };
  },
  mounted() {
    this.formAction = this.id ? 'Edit' : 'Create';

    if (!this.editId) {
      this.slug = this.$route.query.slug;

      this.isLoading = false;
    } else {
      this.id = this.editId;
      this.getCurrentNote(this.id);
    }

    setTitleAndDescription({
      title: `${this.formAction} Note`,
    });
  },
  methods: {
    async getCurrentNote(id) {
      try {
        this.isLoading = true;

        const result = await this.getNote(id);

        Object.assign(this, result.data);

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    resetFormErrors() {
      this.success = null;

      this.result = null;

      this.errorMessage = '';
    },
    checkForm() {
      this.resetFormErrors();

      let passed = true;

      if (this.fullText === '') {
        this.errorMessage = 'Please enter the text of the note.';

        passed = false;
      }

      return passed;
    },
    async submitForm(id) {
      const url = `/notes/${id}`;

      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const verb = id ? 'PUT' : 'POST';
          await axiosInstance({
            method: verb,
            url,
            data: {
              fullText: this.fullText,
              slug: this.slug,
            },
          });
          this.success = true;
        } else {
          this.$store.dispatch('errors/setError', this.errorMessage);
        }
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },

    async getNote(id) {
      return axiosInstance({
        method: 'GET',
        url: `/notes/${id}`,
      });
    },
  },
};
</script>

<style scoped>
button {
  margin-top: var(--typography-spacing-vertical);
}
</style>
