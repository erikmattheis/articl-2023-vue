<template>
  <article>
    <h1>Reset password</h1>
    <form>
      <input
        id="username"
        hidden
        type="text"
        name="username"
        autocomplete="email"
      >
      <label for="password">New password
        <small
          v-if="passwordComplexity < 3"
          class="lighter left-space"
        >
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small
          v-else-if="password.length < 8"
          class="lighter left-space"
        >
          Please use 8 or more characters.
        </small>
        <div class="toggle-password">
          <input
            id="password"
            v-model="password"
            :type="passwordType"
            autocomplete="new-password"
          >
          <the-button-toggle-hidden
            class="toggle-password-mask"
            @show="passwordType = passwordType === 'text' ? 'password' : 'text'"
          />
        </div>
      </label>
      <label for="password2">Confirm new password
        <div class="toggle-password">
          <input
            id="password2"
            v-model="password2"
            :type="password2Type"
            autocomplete="new-password"
          >
          <the-button-toggle-hidden
            class="toggle-password-mask"
            @show="password2Type = password2Type === 'text' ? 'password' : 'text'"
          />
        </div>
      </label>
      <button
        id="reset"
        type="submit"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        <span v-if="!buttonDisabled">Reset Password</span>
      </button>
      <p
        v-if="result"
        class="invalid"
      >
        {{ result }}
      </p>
    </form>
  </article>
</template>

<script>
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import { setTitleAndDescription } from "@/services/htmlMetaService";
import { scoreChars, validateEmail } from "@/services/userService";

export default {
  name: "PasswordReset",
  components: {
    theButtonToggleHidden,
  },
  data: () => {

    return {
      email: null,
      password: null,
      password2: null,
      passwordType: "password",
      password2Type: "password",
      buttonDisabled: false,
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
  mounted: () => {

    setTitleAndDescription({
      title: "Reset Password",
    });

  },
  methods: {
    checkForm() {

      let passed = true;

      if (this.password?.length < 8) {

        this.errorMessage = "Passwords are at least eight characters.";
        passed = false;

      }

      else if (this.password !== this.password2) {

        this.errorMessage = "Passwords do not mach.";
        passed = false;

      }

      return passed;

    },

    resetFormErrors() {

      this.success = null;

      this.result = null;

    },

    async submitForm() {

      try {

        const {
          token,
        } = this.$route.query;

        if (this.checkForm() === true) {

          this.buttonDisabled = true;
          console.log("before request");
          await this.$http({
            method: "POST",
            url: "/auth/change-password",
            params: {
              token,
            },
            data: {
              password: this.password,
            },
          });
          console.log("after request");
          this.$store.dispatch("modals/setSuccessTitle", "Password updated");

          this.$store.dispatch(
            "modals/setSuccessMessage",
            "You have successfully changed your password.",
          );

        } else {

          this.$store.dispatch("errors/setError", this.errorMessage);

        }

      } catch (error) {

        this.$store.dispatch("errors/setError", error);

      } finally {

        this.buttonDisabled = false;

      }

    },
    scoreChars,
    validateEmail,
  },
};
</script>
