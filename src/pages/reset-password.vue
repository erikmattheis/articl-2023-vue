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

      <label for="password"
        >New password
        <small class="lighter left-space" v-if="passwordComplexity < 3">
          Use upper- and lowercase, numerical and special characters.
        </small>
        <small class="lighter left-space" v-else-if="password.length < 8">
          Please use 8 or more characters.
        </small>

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
            name="password2"
            id="password2"
            autocomplete="new-password"
          />
          <the-button-toggle-hidden
            class="togglePasswordMask"
            @show="showPassword = !showPassword"
          ></the-button-toggle-hidden>
        </div>
      </label>
      <label for="password3"
        >Confirm new password
        <div class="toggle-password">
          <input
            v-if="showPassword2"
            v-model="password2"
            type="text"
            name="passwor32"
            id="password3"
            autocomplete="new-password"
          />
          <input
            v-if="!showPassword2"
            v-model="password2"
            type="password"
            name="password4"
            id="password4"
            autocomplete="new-password"
          />
          <the-button-toggle-hidden
            class="togglePasswordMask"
            @show="showPassword2 = !showPassword2"
          ></the-button-toggle-hidden>
        </div>
      </label>

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
import { scoreChars, validateEmail } from "@/services/userService";
import { setTitleAndDescription } from "@/services/htmlMetaService";
import theButtonToggleHidden from "@/components/ui/TheButtonToggleHidden.vue";

export default {
  name: "PasswordReset",
  components: {
    theButtonToggleHidden,
  },
  data() {

    return {
      email: null,
      password: null,
      password2: null,
      showPassword: false,
      showPassword2: false,
      buttonDisabled: false,
      passwordComplexity: 0,
      errorMessage: "",
      success: false,
      result: null,
      chrs: 0,
    };
  
},
  mounted() {

    this.setTitleAndDescription({ title: "Reset Password" });
  
},
  watch: {
    password: {
      handler(val) {

        this.passwordComplexity = this.scoreChars(val);
      
},
    },
  },
  methods: {
    checkForm() {

      let passed = true;

      if (this.validateEmail(this.email)) {

        this.errorMessage = "Please enter a valid email.";
        passed = false;
      
} else if (this.password && this.password.length < 8) {

        this.errorMessage = "Passwords are at least eight characters.";
        passed = false;
      
}

      return passed;
    
},

    resetFormErrors() {

      this.success = null;
      this.result = null;
    
},

    async submitForm() {

      const { token } = this.$route.query;

      if (this.checkForm() === true) {

        this.buttonDisabled = true;
        await this.$http({
          method: "POST",
          url: "/auth/reset-password",
          params: { token },
          data: {
            password: this.password,
          },
        });
        this.$store.dispatch("modals/setSuccessTitle", "Password updated");
        this.$store.dispatch(
          "modals/setSuccessMessage",
          "You have successfully changed your password."
        );
        this.buttonDisabled = false;
      
} else {

        this.$store.dispatch("errors/setError", this.errorMessage);
      
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
