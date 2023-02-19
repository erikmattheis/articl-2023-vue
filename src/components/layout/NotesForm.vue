<template>
  <template v-if="!isLoading && note?.id">
    <form>
      <label for="fullText">
        <textarea
          id="fullText"
          v-model="note.fullText"
          name="fullText" /></label>

      <button
        type="button"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()">
        {{ !note.id ? "Create" : "Edit" }} Note
      </button>
    </form>
  </template>
  <transition
    name="fade"
    mode="out-in">
    <loading-placeholder v-if="isLoading" />
  </transition>
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
    passedNote: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      note: {},
      isLoading: false,
      formAction: false,
      noteCreated: false,
      buttonDisabled: false,
    };
  },

  mounted() {
    this.note = this.passedNote;

    if (!this.note?.id) {
      this.formAction = 'Create';
      this.isLoading = false;
    } else {
      this.formAction = 'Edit';
    }

    setTitleAndDescription({
      title: `${this.formAction} Note`,
    });
  },
  methods: {
    /*
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
    */
    resetFormErrors() {
      this.errorMessage = '';
    },
    checkForm() {
      this.resetFormErrors();

      let passed = true;

      if (this.note.fullText === '') {
        this.errorMessage = 'Please enter the text of the note.';

        passed = false;
      }

      return passed;
    },
    async submitForm() {
      const url = `/notes/${this.note?.id}`;

      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const verb = this.note.id ? 'PATCH' : 'POST';
          await axiosInstance({
            method: verb,
            url,
            data: {
              fullText: this.note.fullText,
            },
          });
          this.noteCreated = true;
        } else {
          this.$store.dispatch('errors/setError', this.errorMessage);
        }
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: var(--typography-spacing-vertical);
}
</style>
