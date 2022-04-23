<template>
  <article>
    <h1 v-if="!success">Articl.net User: {{ fullName }}</h1>
    <h1 v-else>Account Updated</h1>
    <form v-if="!success">
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
      <fieldset>
        <label for="theme">Theme</label>

        <input
          @click="toggleTheme()"
          type="checkbox"
          id="theme"
          name="theme"
          role="switch"
          :checked="theme === 'dark'"
        />
        {{ theme }}
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
import userService from "@/services/userService";
import localStorageService from "@/services/localStorageService";

export default {
  name: "usersPage",
  data() {
    return {
      theme: null,
      nameFirst: "",
      nameLast: "",
      email: null,
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
    this.theme = localStorageService.get("data-theme");
    this.theme = this.theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
  },
  methods: {
    setTitleAndDescription() {
      const documentTitle = "Articl.net Registration";
      const metaDescription = "";
      this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });
    },
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", this.theme);
      localStorageService.set("data-theme", this.theme);
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
        this.$store.dispatch("setError", error);
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
          return this.$store.dispatch("setError", result);
        })
        .catch((error) => this.$store.dispatch("setError", error));
    },
    resetFormErrors() {
      this.success = null;
      this.result = null;
      this.errorMessage = "";
    },
    checkForm() {
      this.resetFormErrors();
      let passed = true;
      if (!userService.validateEmail(this.email)) {
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
              this.$store.dispatch("setSuccessTitle", "User Updated");
              this.$store.dispatch(
                "setSuccessMessage",
                "Your account information was successfully updated."
              );
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
.toggle-password {
  position: relative;
}

.togglePasswordMask {
  position: absolute;
  right: 1rem;
  top: 40%;
  transform: translateY(-40%);
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;
}

.success {
  border: 8px solid green;
  background-color: honeydew;
}
</style>

