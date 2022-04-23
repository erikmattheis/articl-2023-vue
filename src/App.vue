<template>
  <the-header></the-header>
  <main>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
  <the-footer></the-footer>
  <modal-error></modal-error>
  <modal-success></modal-success>
</template>



<script>
import ModalError from "@/components/ui/ModalError.vue";
import ModalSuccess from "@/components/ui/ModalSuccess.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

/* 1939 .js
 *  538 .vue
 *
 * 2706 .js
 ****/

export default {
  components: {
    TheHeader,
    TheFooter,
    ModalError,
    ModalSuccess,
  },
};
</script>

<style lang="css">
body {
  border-radius: 0;
  font-size: 12px;
}
</style>

<style lang="scss">
@import "~/node_modules/normalize.css/normalize.css";
@import "~/node_modules/the-new-css-reset/css/reset.css";
@import "~/node_modules/@picocss/pico/css/pico.css";

@import url("//fonts.googleapis.com/css2?family=Poppins&display=swap");

body,
input:-webkit-autofill::first-line,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  font: 17px/1.3 "Poppins", sans-serif !important;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

body * {
  border-radius: 0 !important;
}
body div form input[role="switch"] {
  border-radius: 1rem !important;
}

ul {
  padding-left: 0;
}

li {
  list-style-type: none !important;
}

.lighter {
  opacity: 0.7;
}

.left-space {
  padding-left: 2rem;
}

.right {
  text-align: right;
}

.error {
  padding: 1rem;
  background-color: #ffbaba;
}

.error li {
  color: #d8000c;
}

@import "~/node_modules/@picocss/pico/scss/_variables.scss";

@media (min-width: map-get($breakpoints, "xs")) {
  #app,
  .max-container-width {
    width: 96%;
  }
}

@media (min-width: map-get($breakpoints, "lg")) {
  #app,
  .max-container-width {
    max-width: map-get($viewports, "lg");
  }
}

@media (min-width: map-get($breakpoints, "xl")) {
  #app,
  .max-container-width {
    width: map-get($viewports, "lg");
  }
}
</style>
