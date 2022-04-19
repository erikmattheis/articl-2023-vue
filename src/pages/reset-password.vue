<template>
  <article>
    <h1>Reset password</h1>
    <form ng-if="!result">
      <input
        type="hidden"
        name="username"
        id="username"
        value=""
        autocomplete="username"
      />

      <input
        type="hidden"
        name="username"
        id="username"
        value=""
        autocomplete="username"
      />
      <label for="password"
        >New password
        <small class="lighter left-space" v-if="passwordComplexity < 3">
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small class="lighter left-space" v-else-if="password.length < 8">
          Please use 8 or more characters.
        </small>
      </label>
      <div class="toggle-password">
        <input
          v-if="showPassword"
          v-model="password"
          type="text"
          name="password"
          id="password"
          autocomplete="new-password"
        />
        <input
          v-if="!showPassword"
          v-model="password"
          type="password"
          name="password"
          id="password"
          autocomplete="new-password"
        />
        <the-button-toggle-hidden
          class="togglePasswordMask"
          @show="showPassword = !showPassword"
        ></the-button-toggle-hidden>
      </div>
      <label for="password2">Confirm new password</label>
      <div class="toggle-password">
        <input
          v-if="showPassword2"
          v-model="password2"
          type="text"
          name="password2"
          id="password2"
          autocomplete="new-password"
        />
        <input
          v-if="!showPassword2"
          v-model="password2"
          type="password"
          name="password2"
          id="password2"
          autocomplete="new-password"
        />
        <the-button-toggle-hidden
          class="togglePasswordMask"
          @show="showPassword2 = !showPassword2"
        ></the-button-toggle-hidden>
      </div>
      <div v-if="passwordInvalid"></div>

      <div v-if="dataInvalid"></div>
      <button
        type="submit"
        id="reset"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        <span v-if="!buttonDisabled">Reset Password</span>
      </button>
      <p v-if="result" class="invalid">{{ result }}</p>
    </form>
  </article>
</template>

<script>
import TheButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import userService from "@/services/userService";

export default {
  name: "PasswordReset",
  components: {
    TheButtonToggleHidden,
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
  mounted() {
    this.setTitleAndDescription();
  },
  methods: {
    setTitleAndDescription() {
      const documentTitle = "Articl.net Reset Password";
      const metaDescription = "";
      this.$store.dispatch("setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });
    },
    resetForm() {
      this.passwordInvalid = null;
      this.passwordInvalid2 = null;
      this.dataInvalid = false;
      this.success = null;
      this.result = null;
    },
    checkForm() {
      this.resetFormErrors();
      let passed = true;
      if (!userService.validateEmail(this.email)) {
        this.errorMessage = "Please enter a valid email.";
        passed = false;
      } else if (userService.scoreChars(this.password) < 3) {
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
      const { token } = this.$route.query;
      if (this.checkForm() === true) {
        this.buttonDisabled = true;
        this.$http({
          method: "POST",
          url: "/auth/reset-password",
          data: {
            token,
            password: this.password,
          },
        })
          .then(() => {
            this.$store.dispatch("setSuccessTitle", "Password updated");
            this.$store.dispatch(
              "setSuccessMessage",
              "You have successfully changed your password."
            );
          })

          .catch((error) => {
            this.dataInvalid = true;
            this.$store.dispatch("setError", error);
          })
          .finally(() => {
            this.buttonDisabled = false;
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
