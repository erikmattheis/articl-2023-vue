<template>
  <article>
    <h1>Change Password</h1>
    <form>

      <label for="newPassword">New password
        <small
          v-if="passwordComplexity < 3"
          class="lighter left-space">
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small
          v-else-if="newPassword.length < 8"
          class="lighter left-space">
          Please use 8 or more characters.
        </small>
        <div class="toggle-password">
          <input
            id="newPassword"
            v-model="newPassword"
            :type="newPasswordType"
            autocomplete="new-password">
          <the-button-toggle-hidden
            class="toggle-password-mask"
            @show="newPasswordType = newPasswordType === 'text' ? 'password' : 'text'" />
        </div>
      </label>
      <label for="newPassword2">Confirm new new password
        <div class="toggle-password">
          <input
            id="newPassword2"
            v-model="newPassword2"
            :type="newPassword2Type"
            autocomplete="new-password">
          <the-button-toggle-hidden
            class="toggle-password-mask"
            @show="newPassword2Type = newPassword2Type === 'text' ? 'password' : 'text'" />
        </div>
      </label>
      <button
        id="reset"
        type="submit"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()">
        <span v-if="!buttonDisabled">Change Password</span>
      </button>
      <p
        v-if="result"
        class="invalid">
        {{ result }}
      </p>
    </form>
  </article>
</template>

<script>
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import { scoreChars } from "@/services/userService";
import axiosInstance from "@/services/axiosService";

export default {
  name: "PasswordReset",
  components: {
    theButtonToggleHidden,
  },
  data: () => ({
    password: null,
    newPassword: null,
    newPassword2: null,
    passwordType: "password",
    newPasswordType: "password",
    newPassword2Type: "password",
    buttonDisabled: false,
    passwordComplexity: 0,
    errorMessage: "",
    success: false,
    result: null,
    chrs: 0,
  }),
  watch: {
    newPassword: {
      handler(val) {
        this.passwordComplexity = scoreChars(val);
      },
    },
  },
  created() {
    this.setTitleAndDescriptionMixin({
      titleHtml: "Change Password",
    });
  },
  // eslint-disable-next-line no-undef
  methods: {
    checkForm() {
      let passed = true;

      if (this.newPassword?.length < 8) {
        this.errorMessage = "Passwords are at least eight characters.";
        passed = false;
      } else if (this.newPassword !== this.newPassword2) {
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
        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          await axiosInstance({
            method: "POST",
            url: "/auth/change-password",
            data: {
              token: this.$route.query.token,
              password: this.newPassword,
            },
          });

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
  },
};
</script>
