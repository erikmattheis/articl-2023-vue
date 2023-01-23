<template>
  <article>
    <h1 v-if="method === 'PATCH'">
      Articl.net User: {{ nameFirst }} {{ nameLast }}<br>
    </h1>
    <h1 v-else>
      Create Account
    </h1>
    <form>
      <template v-if="!isLoading">
        <label for="username">Username {{ isLoggedInMixin }}
          <input
            id="username"
            v-model="username"
            :readonly="isLoggedInMixin"
            type="text"
            name="username"
            autocomplete="username"
            :aria-invalid="usernameInvalid"
            @keyup="removeUsernameWhiteSpace"
            @blur="elementBlurred"></label>

        <label
          v-if="!isLoggedInMixin"
          for="password">Password
          <small
            v-if="passwordComplexity < 3"
            class="left-space">
            Use upper- and lowercase, numerical and special characters.
          </small>
          <small
            v-else-if="password.length < 8"
            class="left-space">
            Please use 8 or more characters.
          </small>

          <div class="toggle-password">
            <input
              id="password"
              v-model="password"
              :type="passwordType"
              :aria-invalid="passwordInvalid"
              name="password"
              autocomplete="new-password"
              @keyup="checkPassword"
              @blur="elementBlurred">
            <the-button-toggle-hidden
              class="toggle-password-mask"
              @show="passwordType = passwordType === 'text' ? 'password' : 'text'" />
          </div>
        </label>
        <label
          v-if="!isLoggedInMixin"
          for="password2">Confirm password
          <div class="toggle-password">
            <input
              id="password2"
              v-model="password2"
              :type="password2Type"
              name="password2"
              :aria-invalid="password2Invalid"
              autocomplete="new-password"
              @blur="elementBlurred">
            <the-button-toggle-hidden
              class="toggle-password-mask"
              @show="password2Type = password2Type === 'text' ? 'password' : 'text'" />
          </div>
        </label>

        <fieldset class="grid">
          <div>
            <label for="nameFirst">First Name
              <input
                id="nameFirst"
                v-model="nameFirst"
                type="text"
                name="nameFirst"
                :aria-invalid="nameFirstInvalid"
                autocomplete="given-name"
                @blur="elementBlurred"></label>
          </div>
          <div>
            <label for="nameLast">Last Name
              <input
                id="nameLast"
                v-model="nameLast"
                type="text"
                name="nameLast"
                :aria-invalid="nameLastInvalid"
                autocomplete="family-name"
                @blur="elementBlurred"></label>
          </div>
        </fieldset>

        <label for="email">Email
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            :aria-invalid="emailInvalid"
            autocomplete="email"
            @blur="elementBlurred"></label>

        <label for="position">Current position
          <select
            id="position"
            v-model="position"
            name="position"
            :aria-invalid="positionInvalid"
            @blur="elementBlurred">
            <option
              disabled
              value="">
              Please select one
            </option>
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
            :aria-invalid="educationInvalid"
            autocomplete="education"
            @blur="elementBlurred"></label>
        <label for="institution">Institution
          <input
            id="institution"
            v-model="institution"
            type="text"
            name="institution"
            :aria-invalid="institutionInvalid"
            autocomplete="organization"
            @blur="elementBlurred"></label>
        <label for="city">City
          <input
            id="city"
            v-model="city"
            type="text"
            name="city"
            :aria-invalid="cityInvalid"
            autocomplete="address-level2"
            @blur="elementBlurred"></label>
        country: {{ country }}
        <select-countries
          id="country"
          :country="country"
          :aria-invalid="countryInvalid"
          @change-country="changeCountry"
          @focusout="elementBlurred" />

        <button
          id="Update"
          type="submit"
          :aria-busy="buttonDisabled"
          :disabled="buttonDisabled"
          @click.prevent="submitForm">
          <span v-if="!buttonDisabled && method === 'PATCH'">Update Account</span>
          <span v-else-if="!buttonDisabled">Create Account</span>
        </button>
        <router-link to="/change-password">
          Change password
        </router-link>
        <router-link
          to="/logout"
          class="right">
          Log out
        </router-link>
      </template>
    </form>
  </article>
</template>

<script>

import selectCountries from '@/components/ui/SelectCountries.vue';
import theButtonToggleHidden from '@/components/ui/TheButtonToggleHidden.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';
import { scoreChars, validateEmail } from '@/services/userService';

export default {
  name: 'UsersPage',
  components: {
    selectCountries,
    theButtonToggleHidden,
  },
  props: {
    id: {
      default: () => '',
      type: String,
    },
  },

  data: () => ({
    focusedElements: [],
    username: '',
    password: '',
    passwordType: 'password',
    password2: '',
    password2Type: 'password',
    passwordComplexity: 0,
    nameFirst: '',
    nameLast: '',
    email: '',
    position: '',
    education: '',
    institution: '',
    city: '',
    country: '',
    method: 'PATCH',
    formActionUrl: '/users/me',
    buttonDisabled: false,
    isLoading: true,
    errorMessage: '',
    result: '',
  }),
  computed: {
    usernameInvalid() {
      if (this.focusedElements.indexOf('username') === -1) {
        return null;
      }
      return this.username.length < 3;
    },
    passwordInvalid() {
      if (this.focusedElements.indexOf('password') === -1) {
        return null;
      }
      return this.password.length > 7 && this.passwordComplexity > 2;
    },
    password2Invalid() {
      if (this.focusedElements.indexOf('password2') === -1) {
        return null;
      }
      return this.password2 !== this.password;
    },
    nameFirstInvalid() {
      if (this.focusedElements.indexOf('nameFirst') === -1) {
        return null;
      }
      return this.nameFirst.length === 0;
    },
    nameLastInvalid() {
      if (this.focusedElements.indexOf('nameLast') === -1) {
        return null;
      }
      return this.nameLast.length === 0;
    },
    emailInvalid() {
      if (this.focusedElements.indexOf('email') === -1) {
        return null;
      }
      return this.validateEmail(this.email);
    },
    educationInvalid() {
      if (this.focusedElements.indexOf('education') === -1) {
        return null;
      }
      return this.education.length === 0;
    },
    positionInvalid() {
      if (this.focusedElements.indexOf('position') === -1) {
        return null;
      }
      return this.position.length === 0;
    },
    institutionInvalid() {
      if (this.focusedElements.indexOf('institution') === -1) {
        return null;
      }
      return this.institution.length === 0;
    },
    cityInvalid() {
      if (this.focusedElements.indexOf('city') === -1) {
        return null;
      }
      return this.city.length === 0;
    },
    countryInvalid() {
      if (this.focusedElements.indexOf('country') === -1) {
        return null;
      }
      return this.country.length === 0;
    },
  },
  watch: {
    password: {
      handler(val) {
        this.passwordComplexity = this.scoreChars(val);
      },
    },
  },
  mounted() {
    if (this.isLoggedInMixin) {
      this.method = 'GET';

      this.fetchData();

      this.method = 'PATCH';
    } else {
      this.method = 'POST';

      this.formActionUrl = '/auth/register';

      this.isLoading = false;
    }

    setTitleAndDescription({
      title: 'Articl.net User',
    });
  },

  methods: {
    elementBlurred(e) {
      if (this.focusedElements.indexOf(e.target.name) === -1) {
        this.focusedElements.push(e.target.name);
      }
    },
    async fetchData() {
      try {
        this.isLoading = true;

        const result = await this.getMe();

        /* Object.assign(this, result); */

        this.username = result.username ? result.username : '';

        this.nameFirst = result.nameFirst ? result.nameFirst : '';

        this.nameLast = result.nameLast ? result.nameLast : '';

        this.email = result.email ? result.email : '';

        this.education = result.education ? result.education : '';

        this.position = result.position ? result.position : '';

        this.institution = result.institution ? result.institution : '';

        this.city = result.city ? result.city : '';

        this.state = result.state ? result.state : '';

        this.country = result.country ? result.country : '';

        this.theme = result.theme !== 'dark' ? 'light' : 'dark';

        this.fontSize = result.fontSize ? result.fontSize : '';
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.isLoading = false;
      }
    },

    async getMe() {
      const result = await this.$http({
        method: 'GET',
        url: '/users/me',
      });

      return result.data;
    },

    resetFormErrors() {
      this.result = null;
    },
    changeCountry(country) {
      this.country = country;
    },

    /*

        this.nameFirstInvalid = true;
        errorMessages.push("Please enter both your fist and last names.");
        passed = false;

      }
    if(!this.nameLast) {

      this.nameLastInvalid = true;
      errorMessages.push("Please enter both your fist and last names.");
      passed = false;

    }
    if (!this.institution) {

      this.institutionInvalid = true;
      errorMessages.push("Please enter your institution.");
      passed = false;

    }
    if (!this.city) {

      this.cityInvalid = true;
      errorMessages.push("Please enter your city.");
      passed = false;

    }
    if (!this.country) {

      this.countryInvalid = true;
      errorMessages.push("Please enter your country.");
      passed = false;
      {

      }
    }
        */
    checkForm() {
      const passed = true;

      const errorMessages = [];

      if (!passed) {
        this.errorMessage = errorMessages.join(',');
        this.$store.dispatch('errors/setError', this.errorMessage);
      }

      return passed;
    },

    async submitForm() {
      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
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
              institution: this.institution,
              city: this.city,
              country: this.country,
            },
          });

          if (result.data) {
            this.result = result.data;

            if (this.method === 'POST') {
              this.$store.dispatch('modals/setSuccessTitle', 'User Created');

              this.$store.dispatch('modals/setSuccessMessage', `Please click on the link in the verification email that was sent to ${this.email}.`);
            } else {
              this.$store.dispatch('modals/setSuccessTitle', 'User Updated');

              this.$store.dispatch('modals/setSuccessMessage', 'Your account information was successfully updated.');
            }
          } else {
            this.$store.dispatch('errors/setError', 'Unknown response.');
          }
        }
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
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
