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

export default {
  components: {
    TheHeader,
    TheFooter,
    ModalError,
    ModalSuccess,
  },
};
</script>

<style lang="scss">
@import "~/node_modules/@picocss/pico/css/pico.css";

@import url("//fonts.googleapis.com/css2?family=Poppins&display=swap");

body {
  border-radius: 0;
}

body,
input:-webkit-autofill::first-line,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  font: "Poppins", sans-serif;
  font-size: 17px;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

body * {
  border-radius: 0 !important;
}
body div form input[role="switch"],
body div form input[type="radio"] {
  border-radius: 1rem !important;
}

ul {
  padding-left: 0;
  list-style-type: none !important;
}

ul li {
  list-style-type: none !important;
}

small {
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

header article,
footer article {
  background-color: #efefef;
}

html[data-theme="dark"] header article,
html[data-theme="dark"] footer article {
  background-color: #0f191c;
}

header article {
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}
main article {
  margin-top: 0;
  margin-bottom: 0;
}
main form {
  margin-bottom: 0;
}
footer article {
  margin-top: 0;
  margin-bottom: 0.5rem;
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
