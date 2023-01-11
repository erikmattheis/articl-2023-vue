<template>
  <article>
    <h1 v-if="method === 'PATCH'">
      Articl.net User: {{ nameFirst }} {{ nameLast }}<br>
      successTitle: {{ successTitle }}<br>
    </h1>
    <h1 v-else>
      Create Account
    </h1>
    <form>
      <template v-if="!isLoading">
        <teplate v-if="method === 'POST'">
          <label for="username">User Name
            <input
              id="username"
              v-model="username"
              type="text"
              name="username"
              autocomplete="username"
              @keyup="removeUsernameWhiteSpace"
            ></label>

          <label for="password">Password
            <small
              v-if="passwordComplexity < 3"
              class="left-space"
            >
              Use upper- and lowercase, numerical and special characters.
            </small>
            <small
              v-else-if="password.length < 8"
              class="left-space"
            >
              Please use 8 or more characters.
            </small>

            <div class="toggle-password">
              <input
                id="password"
                v-model="password"
                :type="passwordType"
                name="password"
                autocomplete="new-password"
              >
              <the-button-toggle-hidden
                class="toggle-password-mask"
                @show="passwordType = passwordType === 'text' ? 'password' : 'text'"
              />
            </div>
          </label>
          <label for="password2">Confirm password
            <div class="toggle-password">
              <input
                id="password2"
                v-model="password2"
                :type="password2Type"
                name="password2"
                autocomplete="new-password"
              >
              <the-button-toggle-hidden
                class="toggle-password-mask"
                @show="password2Type = password2Type === 'text' ? 'password' : 'text'"
              />
            </div>
          </label>
        </teplate>
        <p v-else>
          Username: {{ username }}
        </p>
        <fieldset class="grid">
          <div>
            <label for="nameFirst">First Name
              <input
                id="nameFirst"
                v-model="nameFirst"
                type="text"
                name="nameFirst"
                autocomplete="given-name"
              ></label>
          </div>
          <div>
            <label for="nameLast">Last Name
              <input
                id="nameLast"
                v-model="nameLast"
                type="text"
                name="nameLast"
                autocomplete="family-name"
              ></label>
          </div>
        </fieldset>

        <label for="email">Email
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            autocomplete="email"
          ></label>

        <label for="position">Current position
          <select
            id="position"
            v-model="position"
            name="position"
          >
            <option
              disabled
              value=""
            >Please select one</option>
            <option value="Student">Student</option>
            <option value="Resident">Resident</option>
            <option value="Physician">Physician</option>
            <option value="Allied Healthcare Profession">Allied Healthcare Profession</option>
          </select>
        </label>
        <label for="education">School
          <input
            id="education"
            v-model="education"
            type="text"
            name="education"
            autocomplete="education"
          ></label>
        <label for="institution">Institution
          <input
            id="institution"
            v-model="institution"
            type="text"
            name="institution"
            autocomplete="organization"
          ></label>
        <label for="city">City
          <input
            id="city"
            v-model="city"
            type="text"
            name="city"
            autocomplete="address-level2"
          ></label>
        <label for="country">Country
          <select-countries
            v-model="country"
            @change-country="changeCountry"
          />
        </label>
        <button
          id="Update"
          type="submit"
          :aria-busy="buttonDisabled"
          :disabled="buttonDisabled"
          @click.prevent="submitForm"
        >
          <span v-if="!buttonDisabled && method === 'PATCH'">Update Account</span>
          <span v-else-if="!buttonDisabled">Create Account</span>
        </button>
        <router-link to="/change-password">
          Change password
        </router-link>
        <router-link
          to="/logout"
          class="right"
        >
          Log out
        </router-link>
      </template>
    </form>
  </article>
</template>

<script>
import { mapGetters } from "vuex";

import selectCountries from "@/components/ui/SelectCountries.vue";
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";
import { scoreChars, validateEmail } from "@/services/userService";

export default {
  name: "UsersPage",
  components: {
    selectCountries,
    theButtonToggleHidden
  },
  props: {
    id: {
      default: () => { return ""; },
      type: String,
    },
  },

  data: () => {

    return {
      username: "",
      password: "",
      password2: "",
      passwordType: "password",
      password2Type: "password",
      passwordComplexity: 0,
      nameFirst: "",
      nameLast: "",
      email: "",
      position: "",
      city: "",
      country: "",
      education: "",
      institution: "",
      method: "PATCH",
      formActionUrl: "/users/me",
      buttonDisabled: false,
      isLoading: true,
      errorMessage: "",
      result: "",
    };

  },

  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
      errorTitle: "errors/errorTitle",
      errorMessage: "errors/errorMessage",
      errorDetail: "errors/errorDetail",
      errorLineNumber: "errors/errorLineNumber",
      errorFileName: "errors/errorFileName",
      errorStack: "errors/errorStack",
      successTitle: "errors/errorTitle",
      successMessage: "errors/errorMessage",
    }),
  },
  watch: {
    password: {
      handler(val) {

        this.passwordComplexity = this.scoreChars(val);

      },
    },
  },
  mounted() {

    if (this.isLoggedIn) {

      this.method = "GET";

      this.fetchData();

      this.method = "PATCH";

    }
    else {

      this.method = "POST";

      this.formActionUrl = "/auth/register"

      this.isLoading = false;

    }

    setTitleAndDescription({
      title: "Articl.net User",
    });

  },

  methods: {
    concateUsername() {

      this.username = this.nameFirst + this.nameLast

    },
    changeCountry(country) {

      this.country = country;

    },
    async fetchData() {

      try {

        this.isLoading = true;

        const result = await this.getMe();

        this.username = result.username ? result.username : "";

        this.nameFirst = result.nameFirst ? result.nameFirst : "";

        this.nameLast = result.nameLast ? result.nameLast : "";

        this.email = result.email ? result.email : "";

        this.education = result.education ? result.education : "";

        this.position = result.position ? result.position : "";

        this.institution = result.institution ? result.institution : "";

        this.city = result.city ? result.city : "";

        this.state = result.state ? result.state : "";

        this.country = result.country ? result.country : "";

        this.theme = result.theme !== "dark" ? "light" : "dark";

        this.fontSize = result.fontSize ? result.fontSize : "";

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.isLoading = false;

      }

    },

    async getMe() {

      const result = await this.$http({
        method: "GET",
        url: "/users/me",
      });

      return result.data;

    },
    resetFormErrors() {

      this.result = null;

    },
    checkForm() {

      let passed = true;

      let errorMessages = [];

      if (this.username.length < 3) {

        errorMessages.push("User names must be three or more characters");
        passed = false;

      }

      if (!this.validateEmail(this.email)) {

        errorMessages.push("Please enter a valid email.");

        passed = false;

      }
      if (!this.nameFirst || !this.nameLast) {

        errorMessages.push("Please enter both your fist and last names.");

        passed = false;

      }
      if (!this.institution) {

        errorMessages.push("Please enter your institution.");

        passed = false;

      }
      if (!this.city) {

        errorMessages.push("Please enter your city.");

        passed = false;

      }
      if (!this.country) {

        errorMessages.push("Please enter your country.");

        passed = false;

      }

      if (!passed) {

        this.errorMessage = errorMessages.join(",");
        this.$store.dispatch("errors/setError", this.errorMessage);

      }

      return passed;

    },

    async submitForm() {

      try {

        this.resetFormErrors();

        if (this.checkForm() === true) {

          console.log("form passes setting button disabled");

          this.buttonDisabled = true;

          const result = await this.$http({
            method: this.method,
            url: this.formActionUrl,
            data: {
              username: this.username,
              password: this.password,
              nameFirst: this.nameFirst,
              nameLast: this.nameLast,
              email: this.email,
              education: this.education,
              position: this.position,
              education: this.education,
              institution: this.institution,
              city: this.city,
              country: this.country,
            },
          });

          console.log("just  ", this.method);

          if (result.data) {

            console.log("got result");

            this.result = result.data;

            if (this.method === "POST") {

              this.$store.dispatch("modals/setSuccessTitle", "User Created");

              this.$store.dispatch(
                "modals/setSuccessMessage",
                `Please click on the link in the verification email that was sent to ${this.email}.`,
              );

            }
            else {

              this.$store.dispatch("modals/setSuccessTitle", "User Updated");

              this.$store.dispatch(
                "modals/setSuccessMessage",
                "Your account information was successfully updated.",
              );

            }


          } else {

            this.$store.dispatch(
              "errors/setError",
              "Unknown response.",
            );

          }

        }

      }
      catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.buttonDisabled = false;

      }

    },
    removeUsernameWhiteSpace(event) {

      this.username = this.username.replace(/\s/g, "");

    },
    scoreChars,
    validateEmail,
  },
};
</script>

<style scoped>
nav ul {
  display: block;
}
</style>
