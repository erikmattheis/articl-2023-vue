<template>
  <div class="vertical-container">
    <the-header />
    <main>
      <router-view
        v-slot="{ Component }"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <the-footer />
  </div>
  <modal-error />
  <modal-success />
</template>

<script>
/* VUE
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @enter-cancelled="onEnterCancelled"
          @before-leave="onBeforeLeave"
          @leave="onLeave"
          @after-leave="onAfterLeave"
          @leave-cancelled="onLeaveCancelled"
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

import TheFooter from "@/components/layout/TheFooter.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import ModalError from "@/components/ui/ModalError.vue";
import ModalSuccess from "@/components/ui/ModalSuccess.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    ModalError,
    ModalSuccess,
  },
  data: () => {

    return {
      start: 0,
    };

  },
  mounted: () => {

    /*
    this.$store.dispatch("tokens/accessTokenValue", this.$cookies.get("accessTokenValue"));

    this.$store.dispatch("tokens/accessTokenExpires", this.$cookies.get("accessTokenExpires"));

    this.$store.dispatch("tokens/refreshTokenValue", this.$cookies.get("refreshTokenValue"));

    this.$store.dispatch("tokens/refreshTokenExpires", this.$cookies.get("refreshTokenExpires"));

*/

  },
  created() {

    this.start = performance.now();

  },
  methods: {
    // called before the element is inserted into the DOM.
    // use this to set the "enter-from" state of the element
    onBeforeEnter() {

      const result = performance.now() - this.start;

      console.log(`${result} onBeforeEnter`);

    },

    // called one frame after the element is inserted.
    // use this to start the animation.
    onEnter(_el, done) {

      const result = performance.now() - this.start;

      console.log(`${result} onEnter`);

      done();

    },

    // called when the enter transition has finished.
    onAfterEnter() {

      const result = performance.now() - this.start;

      console.log(`${result} onAfterEnter`);

      console.log("----------------");

    },
    onEnterCancelled() {

      const result = performance.now() - this.start;

      console.log(`${result} onEnterCancelled`);

    },
    // called before the leave hook.
    // Most of the time, you shoud just use the leave hook.
    onBeforeLeave() {

      const result = performance.now() - this.start;

      console.log(`${result} onBeforeLeave`);

    },
    // called when the leave transition starts.
    // use this to start the leaving animation.
    onLeave(_el, done) {

      const result = performance.now() - this.start;

      console.log(`${result} onLeave`);

      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done();

    },

    // called when the leave transition has finished and the
    // element has been removed from the DOM.
    onAfterLeave() {

      const result = performance.now() - this.start;

      console.log(`${result} onAfterLeave`);

      console.log("----------------");

    },

    // only available with v-show transitions
    onLeaveCancelled() {

      const result = performance.now() - this.start;

      console.log(`${result} leaveCancelled`);

    },
  },
};

</script>

<style lang="scss">
@import "./assets/variables";
@import "./assets/placeholder";

.fade-enter-active {
transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-leave-active {
transition: opacity 0.1s ease;
}

.fade-leave-to,
.fade-enter-from {
opacity: 0;
}

@media (prefers-reduced-motion) {
.fade-leave-to,
  .fade-enter-from {
opacity: 1;
}
}

@import "~/node_modules/@picocss/pico/css/pico.css";

@import "//fonts.googleapis.com/css2?family=Poppins&display=swap";

:where(:root) {
background-color:var(--bg0);
}

body {
border-radius: 0;
}

:where(:root),
html,
body,
input:-webkit-autofill::first-line,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
font-family: Poppins, Arial, sans-serif !important;
  font-size: 1rem;
  line-height: 1.6rem;

  --primary-focus: transparent;
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

.vertical-container {
display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.vertical-container main {
display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.vertical-container main article {
flex-grow: 1;
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
float: right;
}

header article,
footer article {
background-color: var(--bg1);
}

#app {
background-color: var(--bg2);
}

header article {
padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

main article {
margin-top: 0;
  margin-bottom: 0;
  background-color: var(--bg2);
}

main form {
margin-bottom: 0;
}

footer article {
margin-top: 0;
  margin-bottom: 0;
}

input:not([type="checkbox"], [type="radio"], [type="range"], [type="file"]),
select,
textarea {
padding: 0.4rem 0.6rem !important;
}

input:not([type="checkbox"], [type="radio"], [type="range"]) {
height: initial;
}

.toggle-password {
position: relative;
}

.toggle-password-mask {
position: absolute;
  top: 40%;
  right: 1rem;
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  transform: translateY(-40%);
}

.nav-tabs {
column-gap: 0;
}

.tab-content {
width: 100%;
}

.nav-tabs li,
.note-actions li,
.articl-actions li {
display: inline-block;
  font-size: 1rem;
  vertical-align: middle;
  border-bottom: 1px solid transparent;
}

.nav-tabs li a,
.note-actions a,
.articl-actions a {
display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6rem;
  padding: 0 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-tabs li.active,
.active {
border-color: var(--bg0);
}

.line-detail {
padding: 0 0.5rem;
  background-color: var(--bg1);
}

.line-main {
padding: 0 0.5rem;
}

small {
font-size: 0.7rem;
}

.ghost {
border: 2px dashed red !important;
}

.sr {
display: inline-block;
  line-height: 0.5rem;
  text-indent: -10000px;
}

</style>
