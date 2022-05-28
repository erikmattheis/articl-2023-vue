<template>
  <article>
    <h1 v-if="!success">Articl.net User: {{ fullName }}</h1>
    <h1 v-else>Account Updated</h1>
    <form>
      <fieldset class="grid">
        <div>
          <label for="nameFirst">First Name</label>
          <input
            v-model="nameFirst"
            type="text"
            name="nameFirst"
            id="nameFirst"
            autocomplete="given-name"
          />
        </div>
        <div>
          <label for="nameLast">Last Name</label>
          <input
            v-model="nameLast"
            type="text"
            name="nameLast"
            id="nameLast"
            autocomplete="family-name"
          />
        </div>
      </fieldset>
      <label for="email">Email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        id="email"
        autocomplete="email"
      />
      <input
        type="hidden"
        name="username"
        id="username"
        value=""
        autocomplete="username"
      />
      <label for="institution">Institution</label>
      <input
        v-model="institution"
        type="text"
        name="institution"
        id="institution"
        autocomplete="organization"
      />
      <label for="education">Education</label>
      <input
        v-model="education"
        type="text"
        name="education"
        id="education"
        autocomplete="education"
      />
      <button
        type="submit"
        id="Login"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        <span v-if="!buttonDisabled">Update Account</span>
      </button>
    </form>
  </article>
</template>

<script>
import { validateEmail } from "@/services/userService";

export default {
  name: "usersPage",
  data() {
    return {
      nameFirst: "",
      nameLast: "",
      email: null,
      password2: undefined,
      institution: null,
      education: null,
      buttonDisabled: false,
      errorMessage: "",
      success: false,
      result: null,
    };
  },
  computed: {
    fullName() {
      return this.nameFirst + " " + this.nameLast;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    setTitleAndDescription() {
      const documentTitle = "Articl.net Registration";
      const metaDescription = "";
      this.$store.dispatch("metas/setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });
    },
    async fetchData() {
      try {
        this.buttonDisabled = true;
        const result = await this.getUser("me");
        if (result) {
          this.nameFirst = result.nameFirst ? result.nameFirst : "";
          this.nameLast = result.nameLast ? result.nameLast : "";
          this.email = result.email ? result.email : "";
          this.institution = result.institution ? result.institution : "";
          this.education = result.education ? result.education : "";
        }
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    getUser() {
      return this.$http({
        method: "GET",
        url: "/users/me",
      })
        .then((result) => {
          if (result?.data) {
            return result.data;
          }
          return this.$store.dispatch("errors/setError", result);
        })
        .catch((error) => this.$store.dispatch("errors/setError", error));
    },
    resetFormErrors() {
      this.success = null;
      this.result = null;
      this.errorMessage = "";
    },
    checkForm() {
      this.resetFormErrors();
      let passed = true;
      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Please enter a valid email.";
        passed = false;
      }
      return passed;
    },
    async submitForm() {
      this.resetFormErrors();
      if (this.checkForm() === true) {
        this.buttonDisabled = true;
        this.$http({
          method: "PATCH",
          url: "/users/me",
          data: {
            nameFirst: this.nameFirst,
            nameLast: this.nameLast,
            email: this.email,
            institution: this.institution,
            education: this.education,
            theme: this.theme,
          },
        })
          .then((result) => {
            if (result?.data) {
              this.success = true;
              this.result = result.data;
              this.$store.dispatch("modals/setSuccessTitle", "User Updated");
              this.$store.dispatch(
                "modals/setSuccessMessage",
                "Your account information was successfully updated."
              );
            }
          })
          .catch((error) => {
            this.$store.dispatch("errors/setError", error);
          })
          .finally(() => {
            this.buttonDisabled = false;
          });
      } else {
        this.$store.dispatch("errors/setError", {
          message: this.errorMessage,
        });
      }
    },
    validateEmail,
  },
};
</script>

<style scoped>
nav ul {
  display: block;
}
</style>

