<template>
  <article>
    <h1>Log in</h1>
    <form v-if="!isLoggedIn">
      <input
        type="hidden"
        name="username"
        id="username"
        autocomplete="username"
      />
      <label for="email">Email</label>
      <input
        v-model="email"
        type="text"
        name="email"
        id="email"
        autocomplete="email"
      />

      <label for="password">Password</label>
      <div class="toggle-password">
        <input
          v-if="showPassword"
          v-model="password"
          type="text"
          name="password"
          id="password"
          autocomplete="current-password"
        />
        <input
          v-if="!showPassword"
          v-model="password"
          type="password"
          name="password"
          id="password"
          autocomplete="current-password"
        />
        <the-button-toggle-hidden
          class="togglePasswordMask"
          @show="showPassword = !showPassword"
        >
        </the-button-toggle-hidden>
      </div>
      <button
        type="submit"
        id="Login"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()"
      >
        <span v-if="!buttonDisabled">Login</span>
      </button>
    </form>
    <p v-else>You are already logged in.</p>
    <router-link to="/forgot-pass">Forgot pass</router-link>
    <router-link to="/register" class="right">Create account</router-link>
  </article>
</template>

<script>
import TheButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";
import { setTokens, isLoggedIn } from "@/services/tokensService";
import validateEmail from "@/services/emailValidationService";

export default {
  name: "loginPage",
  components: {
    TheButtonToggleHidden,
  },
  data() {
    return {
      email: null,
      emailInvalid: null,
      password: null,
      passwordInvalid: null,
      showPassword: false,
      buttonDisabled: false,
    };
  },
  mounted() {
    this.setTitleAndDescription();
  },
  computed: {
    isLoggedIn,
  },
  methods: {
    setTitleAndDescription() {
      const documentTitle = "Articl.net Login";
      const metaDescription = "";
      this.$store.dispatch("metas/setMetaDescriptionAndDocumentTitle", {
        documentTitle,
        metaDescription,
      });
    },
    resetFormErrors() {
      this.errorMessage = "";
    },
    checkForm() {
      let passed = true;
      if (!validateEmail.validateEmail(this.email)) {
        this.errorMessage = "Please enter a valid email.";
        passed = false;
      } else if (this.password && this.password.length < 8) {
        this.errorMessage = "Passwords are at least eight characters.";
        passed = false;
      }
      return passed;
    },

    async submitForm() {
      if (this.checkForm() === true) {
        this.buttonDisabled = true;
        this.$http({
          method: "POST",
          url: "/auth/login",
          data: {
            password: this.password,
            email: this.email,
          },
        })
          .then((result) => {
            if (result?.status > 309) {
              this.$store.dispatch("errors/setError", result);
              return;
            }
            this.resetFormErrors();
            setTokens(result);

            const theme =
              result?.data?.user?.theme !== "dark" ? "light" : "dark";
            this.$cookies.set("data-theme", theme);
            document.documentElement.setAttribute("data-theme", theme);
            if (
              this.$route.query.redirect &&
              this.$route.query.redirect !== "/login"
            ) {
              this.$router.push({
                path: this.$route.query.redirect,
              });
            } else {
              this.$router.push({
                name: "homePage",
              });
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

.right {
  float: right;
}
</style>
