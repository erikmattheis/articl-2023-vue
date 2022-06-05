<template>
  <article>
    <h1 v-if="!success">Create account</h1>
    <h1 v-else>Account created</h1>
    <form v-if="!success">
      <label for="email">Email
        <input v-model="email" type="text" name="email" id="email" autocomplete="email" /></label>
      <input type="hidden" name="username" id="username" value="" autocomplete="username" />
      <label for="password">Password
        <small class="left-space" v-if="passwordComplexity < 3">
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small class="left-space" v-else-if="password.length < 8">
          Please use 8 or more characters.
        </small>

        <div class="toggle-password">
          <input v-if="showPassword" v-model="password" type="text" name="password" id="password"
            autocomplete="new-password" />
          <input v-if="!showPassword" v-model="password" type="password" name="password" id="password"
            autocomplete="new-password" />
          <the-button-toggle-hidden class="togglePasswordMask" @show="showPassword = !showPassword">
          </the-button-toggle-hidden>
        </div>
      </label>
      <label for="password2">Confirm password2
        <div class="toggle-password">
          <input v-if="showPassword2" v-model="password2" type="text" name="password2" id="password2"
            autocomplete="new-password" />
          <input v-if="!showPassword2" v-model="password2" type="password" name="password2" id="password2"
            autocomplete="new-password" />
          <the-button-toggle-hidden class="togglePasswordMask" @show="showPassword2 = !showPassword2">
          </the-button-toggle-hidden>
        </div>
      </label>
      <button type="submit" id="Login" :aria-busy="buttonDisabled" @click.prevent="submitForm()">
        <span v-if="!buttonDisabled">Create Account</span>
      </button>
    </form>
    <card-notification v-else success-message="Please check
    your email to verify your email address"></card-notification>
  </article>
</template>

<script>
import { scoreChars, validateEmail } from "@/services/userService";
import cardNotification from "@/components/ui/CardNotification.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";


export default {
  name: "registerPage",
  components: {
    theButtonToggleHidden,
    cardNotification,
  },
  data() {

    return {
      email: null,
      password: null,
      showPassword: false,
      showPassword2: false,
      buttonDisabled: false,
      passwordMismatch: false,
      passwordComplexity: 0,
      errorMessage: "",
      success: false,
      result: null,
      chrs: 0,
    };

  },
  watch: {
    password: {
      handler(val) {

        this.passwordComplexity = this.scoreChars(val);

      },
    },
  },
  mounted() {

    this.setTitleAndDescription({ title: "Registration" });

  },
  methods: {
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

      } else if (this.scoreChars(this.password) < 3) {

        this.errorMessage = "Please choose a more complex password.";
        passed = false;

      } else if (this.password && this.password.length < 8) {

        this.errorMessage = "Please choose a longer password.";
        passed = false;

      } else if (this.password !== this.password2) {

        this.errorMessage = "The password fields must match.";
        passed = false;

      }

      return passed;

    },

    async submitForm() {

      this.resetFormErrors();

      if (this.checkForm() === true) {

        this.buttonDisabled = true;

        const result = this.$http({
          method: "POST",
          url: "/auth/register",
          data: {
            password: this.password,
            email: this.email,
          },
        })


        if (result.data) {

          this.success = true;
          this.result = result.data;

        }


        this.buttonDisabled = false;


      } else {

        this.$store.dispatch("errors/setError", {
          message: this.errorMessage,
        });

      }

    },
    scoreChars,
    validateEmail,
    setTitleAndDescription,
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
