<template>
  <article>
    <template v-if="!isLoading">
      <form>
        <label for="fullText">
          <textarea
            id="fullText"
            v-model="fullText"
            name="fullText" /></label>

        <button
          type="button"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm()">
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
      isLoading: false,
      formAction: false,
      noteCreated: false,
      buttonDisabled: false,
    };
  },

  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },

  mounted() {
    if (!this.editId) {
      this.formAction = 'Create';
      this.isLoading = false;
    } else {
      this.id = this.editId;
      this.formAction = 'Edit';
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
    async submitForm() {
      const url = `/notes/${this.id}`;

      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const verb = this.id ? 'PATCH' : 'POST';
          await axiosInstance({
            method: verb,
            url,
            data: {
              fullText: this.fullText,
              slug: this.slug,
            },
          });
          this.noteCreated = true;
          this.$router.go(0);
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
