<template>
  <article>
    <h1 v-if="!success">Create account</h1>
    <h1 v-else>Account created</h1>
    <form v-if="!success">
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
      <label for="password"
        >Password
        <small class="left-space" v-if="passwordComplexity < 3">
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small class="left-space" v-else-if="password.length < 8">
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
      <label for="password2">Confirm Password</label>
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
      <button
        type="submit"
        id="Login"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        <span v-if="!buttonDisabled">Create Account</span>
      </button>
    </form>
    <card-notification
      v-else
      success-message="Please check
    your email to verify your email address"
    ></card-notification>
  </article>
</template>

<script>
import TheButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import CardNotification from "@/components/ui/CardNotification.vue";
import userService from "@/services/userService";

export default {
  name: "registerPage",
  components: {
    TheButtonToggleHidden,
    CardNotification,
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
        this.passwordComplexity = userService.scoreChars(val);
      },
    },
  },
  mounted() {
    this.setTitleAndDescription();
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
      this.resetFormErrors();
      if (this.checkForm() === true) {
        this.buttonDisabled = true;
        this.$http({
          method: "POST",
          url: "/auth/register",
          data: {
            password: this.password,
            email: this.email,
          },
        })
          .then((result) => {
            if (result.data) {
              this.success = true;
              this.result = result.data;
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
