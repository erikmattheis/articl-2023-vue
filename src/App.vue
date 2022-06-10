<template>
  <the-header />
  <main>
    <router-view />
  </main>
  <the-footer />
  <modal-error />
  <modal-success />
</template>

<script>
/* VUE
 * 1939,1200, 1,244, 1983, 1883 .js
 *  538, 3250, 3,623, 3,910, 5,475
 *

 *
 * NODE
 * 2706,2,487, 2,553, 3842 .js
 *
 * 4/15, 5/20, 6/1, 6/6
 * 5183,6937,7420
 * ==================
 *
 * proj, 4/15, 6/8
 * vue, 2556, 5223
 * node, 2094, 2593
 * total, 4650, 7816
 *** */

import TheFooter from '@/components/layout/TheFooter.vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import ModalError from '@/components/ui/ModalError.vue';
import ModalSuccess from '@/components/ui/ModalSuccess.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    ModalError,
    ModalSuccess,
  },
  mounted() {

    this.$store.dispatch('tokens/accessTokenValue', this.$cookies.get('accessTokenValue'));

    this.$store.dispatch('tokens/accessTokenExpires', this.$cookies.get('accessTokenExpires'));

    this.$store.dispatch('tokens/refreshTokenValue', this.$cookies.get('refreshTokenValue'));

    this.$store.dispatch('tokens/refreshTokenExpires', this.$cookies.get('refreshTokenExpires'));

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
  font-size: 1rem;
  line-height: 1.6rem;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

body * {
  border-radius: 0 !important;
}
input[role="switch"],
input[type="radio"] {
  border-radius: 1rem !important;
}

ul {
  padding-left: 0;
  list-style-type: none !important;
}

ul li {
  list-style-type: none !important;
}

.left-space {
  padding-left: 2rem;
}

.right {
  text-align: right;
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

form ul li,
input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]),
select,
textarea {
  padding: 0.4rem 0.6rem !important;
}
form ul li,
input:not([type="checkbox"]):not([type="radio"]):not([type="range"]) {
  height: initial;
}

.nav-tabs {
  column-gap: 0;
}

.tab-content {
  width: 100%;
  padding: 1.2rem;
}

.nav-tabs li,
.articl-actions li {
  display: inline-block;
  border: 1px solid #888;
  border-right: 0px;
  font-size: 0.8rem;
  vertical-align: middle;
}

.nav-tabs li:last-child,
.articl-actions li:last-child {
  border-right: 1px solid #888;
}

.nav-tabs li a,
.articl-actions a {
  text-decoration: none;
  height: 1.6rem;
  padding: 0 0.5rem;
  transition: background-color .3s ;
  display:flex;
  justify-content:center;
  align-items:center;
}

html[data-theme="light"] {
  .nav-tabs li.active a,
  .nav-tabs li a:hover,
  .articl-actions a:hover,
  .nav-tabs li.active,
  .active {
    background-color: #17262b;
    font-weight:bold;
    color:#fff;
  }
}

html[data-theme="dark"] {
  .nav-tabs li.active a,
  .nav-tabs li a:hover,
  .articl-actions a:hover,
  .nav-tabs li a:active,
  .articl-actions a:active,
  .nav-tabs li.active,
  .active {
    background-color: #d4d4d4;
    color:#000 !important;
  }
}

.ghost {
  border: 2px dashed red !important;
}

.sr {
  display: inline-block;
    line-height:0.5rem;
  text-indent: -10000px;
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
