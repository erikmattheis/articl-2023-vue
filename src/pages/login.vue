<template>
  <article>
    <h1>Log in</h1>
    <form>
      <label for="username">User Name
        <input
          id="username"
          v-model="username"
          name="username"
          type="text"
          autocomplete="username"></label>
      <label for="password">Password
        <div class="toggle-password">
          <input
            id="password"
            v-model="password"
            name="password"
            :type="passwordType"
            autocomplete="current-password"><the-button-toggle-hidden
            class="toggle-password-mask"
            @show="passwordType = passwordType === 'text' ? 'password' : 'text'" />
        </div>
      </label>
      <button
        id="Login"
        type="submit"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()">
        <span v-if="!buttonDisabled">Login</span>
      </button>
    </form>
    Forgot <router-link to="/forgot-pass">
      password
    </router-link>
    or
    <router-link to="/forgot-username">
      username
    </router-link>
    <router-link
      to="/users"
      class="right">
      Create account
    </router-link>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";

export default {
  name: "LoginPage",
  components: {
    theButtonToggleHidden,
  },
  data: () => ({
    username: null,
    usernameInvalid: null,
    password: null,
    passwordInvalid: null,
    showPassword: false,
    buttonDisabled: false,
    passwordType: "password",
  }),
  computed: {
    ...mapGetters({
      user: "users/user",
      tokens: "tokens/tokens",
    }),
  },
  mounted() {
    this.setTitleAndDescriptionMixin({
      titleHtml: "Articl Login",
    });
  },
  methods: {
    resetFormErrors() {
      this.errorMessage = "";
    },
    checkForm() {
      let passed = true;

      if (!this.username) {
        this.errorMessage = "Please enter your username.";

        passed = false;
      }

      if (!this.password) {
        this.errorMessage = "Please enter your password.";

        passed = false;
      }

      return passed;
    },

    async submitForm() {
      try {
        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          await this.$store.dispatch("users/login", {
            password: this.password,
            username: this.username,
          });

          this.resetFormErrors();

          this.$cookies.set("accessTokenExpires", this.tokens.accessTokenExpires);
          this.$cookies.set("accessTokenValue", this.tokens.accessTokenValue);
          this.$cookies.set("refreshTokenExpires", this.tokens.refreshTokenExpires);
          this.$cookies.set("refreshTokenValue", this.tokens.refreshTokenValue);
          this.$cookies.set("user", this.user);

          const theme = this.user?.theme !== "dark" ? "light" : "dark";

          this.$cookies.set(
            "data-theme",
            theme,
          );

          document.documentElement.setAttribute(
            "data-theme",
            theme,
          );

          const fontSize = this.user?.fontSize !== 16 ? this.user?.fontSize : 16;

          this.$cookies.set(
            "font-size",
            fontSize,
          );

          if (
            this.$route.query.redirect
            && this.$route.query.redirect !== "/login"
          ) {
            this.$router.push({
              path: this.$route.query.redirect,
            });
          } else {
            this.$router.push({
              name: "HomePage",
            });
          }
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
