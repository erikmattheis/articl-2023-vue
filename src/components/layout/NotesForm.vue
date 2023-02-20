<template>
    <form>
      <label for="fullText">
        <textarea
          id="fullText"
          v-model="fullText"
          name="fullText" /></label>
          <div class="grid">
<div class="grid-right">
      <a
      href
      class="a"

        tabindex="0"
        role="button"
        @click.prevent="cancel()"
        @keyup.esc.prevent="cancel()">Cancel</a>

      <a
        href
        class="a"
        tabindex="0"
        role="button"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
        @keyup.enter.prevent="submitForm()">
        {{ !note?.id ? "Create" : "Edit" }} Note</a>
      </div></div>
    </form>

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
      default: () => { },
    },
  },
  emits: ['note-updated'],
  data() {
    return {
      note: {},
      fullText: '',
      fullTextOriginal: '',
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
    } else {
      this.fullText = this.note.fullText;
      this.fullTextOriginal = this.note.fullText;
      this.formAction = 'Edit';
    }

    setTitleAndDescription({
      title: `${this.formAction} Note`,
    });
  },
  methods: {
    cancel() {
      // this.fullText = this.fullTextOriginal;
      this.$router.push({ name: 'TabNotes' });
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
      let url = '/notes/';

      const id = this.note?.id;

      if (id) {
        url = `/notes/${id}`;
      }

      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const verb = this.note?.id ? 'PATCH' : 'POST';
          await axiosInstance({
            method: verb,
            url,
            data: {
              fullText: this.fullText,
            },
          });
          this.noteCreated = true;
          this.$emit('note-updated');
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
button,
.a {
  margin-top: var(--nav-link-spacing-vertical);
  margin-right: var(--nav-link-spacing-horizontal);
}

form {
  background-color: var(--muted-border-color);
  padding: var(--form-element-spacing-horizontal) !important;
}

textarea {
  width: 100%;
}
</style>
