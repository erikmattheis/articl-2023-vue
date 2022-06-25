<template>
  <div class="vertical-container">
    <the-header />
    <main>
      <router-view v-slot="{ Component }">
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
  mounted() {

    this.$store.dispatch("tokens/accessTokenValue", this.$cookies.get("accessTokenValue"));

    this.$store.dispatch("tokens/accessTokenExpires", this.$cookies.get("accessTokenExpires"));

    this.$store.dispatch("tokens/refreshTokenValue", this.$cookies.get("refreshTokenValue"));

    this.$store.dispatch("tokens/refreshTokenExpires", this.$cookies.get("refreshTokenExpires"));

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
@import "~/node_modules/@picocss/pico/css/pico.css";
@import "//fonts.googleapis.com/css2?family=Montserrat&display=swap";
@import "//fonts.googleapis.com/css2?family=Poppins&display=swap";

#app {
  background-color: var(--bg2);
}

.admin {
  background-color: #ffffff;
  border: 4px solid green;
  display: inline-block;
  margin: 0;
  padding: 0;

}

.admin button,
.admin a[role=button] {
  background-color: #eeeeee;
  border: 1px solid green;
  color: darkgreen;
  margin: 0.2rem;
  padding: 0 0.8rem;
  font-size: 0.7rem;
}

.articl-actions a,
.note-actions a,
.nav-tabs li a {
  align-items: center;
  display: flex;
  height: 1.6rem;
  justify-content: center;
  padding: 0 .5rem;
  text-decoration: none;
  transition: background-color .3s;
  margin:0;
}

.articl-actions.admin {
  border: 1px solid green;
  margin: 0;
  padding: .3rem;
}

.fade-enter-active {
  transition: opacity .2s ease;
  transition-delay: .2s;
}

.fade-leave-active {
  transition: opacity .1s ease;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.ghost {
  border: 2px dashed red !important;
}

.handle {
  padding: 0 !important;
}

.left-space {
  padding-left: 2rem;
}

.line-detail {
  background-color: var(--bg1);
  padding: 0 0.5rem;
}

.line-main {
  padding: 0 0.5rem;
}

.nav-tabs {
  column-gap: 0;
}

.nav-tabs li,
.note-actions li,
.articl-actions li {
  border-bottom: 1px solid transparent;
  display: inline-block;
  font-size: 1rem;
  vertical-align: middle;
}

.nav-tabs li.active,
.active {
  border-color: var(--bg0);
}

.right {
  float: right;
}

.sr {
  display: inline-block;
  line-height: .5rem;
  text-indent: -10000px;
}

.tab-content {
  width: 100%;
}

.toggle-password {
  position: relative;
}

.toggle-password-mask {
  cursor: pointer;
  height: 2.2rem;
  position: absolute;
  right: 1rem;
  top: 40%;
  transform: translateY(-40%);
  width: 2.2rem;
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

:where(:root),
html,
body {
  --primary-focus: transparent;
  background-color: var(--bg0);
  font-family: Poppins, Arial, sans-serif !important;
}

body {
  align-items: center;
  border-radius: 0;
  display: flex;
  justify-content: center;
}

body * {
  border-radius: 0 !important;
}

footer article {
  margin-bottom: 0;
  margin-top: 0;
}

header article {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}

header article,
footer article {
  background-color: var(--bg1);
}

input:not([type="checkbox"], [type="radio"], [type="range"]) {
  height: initial;
}

input:not([type="checkbox"], [type="radio"], [type="range"], [type="file"]),
select,
textarea {
  padding: .4rem .6rem !important;
}

input[role="switch"],
input[type="radio"] {
  border-radius: 1rem !important;
}

main article {
  background-color: var(--bg2);
  margin-bottom: 0;
  margin-top: 0;
}

main form {
  margin-bottom: 0;
}

small {
  font-size: .7rem;
}

ul {
  list-style-type: none !important;
  padding-left: 0;
}

ul li {
  list-style-type: none !important;
}

@media prefers-reduced-motion {
  .fade-leave-to,
  .fade-enter-from {
    opacity: 1;
  }
}
</style>
