<template>
  <the-header />
  <main>
    <router-view v-slot="{ Component }">
      <transition
        name="scale"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
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
  mounted: () => {
    /*
    this.$store.dispatch("tokens/accessTokenValue", this.$cookies.get("accessTokenValue"));

    this.$store.dispatch("tokens/accessTokenExpires", this.$cookies.get("accessTokenExpires"));

    this.$store.dispatch("tokens/refreshTokenValue", this.$cookies.get("refreshTokenValue"));

    this.$store.dispatch("tokens/refreshTokenExpires", this.$cookies.get("refreshTokenExpires"));
*/
  },
};

</script>

<style lang="scss">
@import "./assets/variables.scss";
@import "./assets/placeholder.scss";
/*
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease-out;
  -webkit-backface-visibility: hidden;
   -moz-backface-visibility: hidden;
   -ms-backface-visibility: hidden;
   backface-visibility: hidden;
-webkit-transform-style: preserve-3d;
   -moz-transform-style: preserve-3d;
   -ms-transform-style: preserve-3d;
transform-style: preserve-3d;
   -webkit-perspective: 1000;
   -moz-perspective: 1000;
   -ms-perspective: 1000;
   perspective: 1000;

   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);

}

.scale-enter-active *,
.scale-leave-active * {
   transform: translate3d(0, 0, 0);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(50%);
  transform: opacity(0.2);
}

.scale-enter-from {
  transform: translateX(-0.2rem);
}

.scale-leave-to {
  transform: translateX(0.2rem);
}
*/
.scale-enter-active {
  animation: scale-in 0.2s;
}
.scale-leave-active {
  animation: scale-out 0.2s;
}
@keyframes scale-in {
  0% {
    //transform: translateX(-2rem);
    opacity:0;
  }
  100% {
    //transform: translateX(0);
    opacity:0;
  }
}
@keyframes scale-out {
  0% {
    transform: translateX();
  }
  100% {
    transform: translateX(2rem);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  z-index: 100;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@import "~/node_modules/@picocss/pico/css/pico.css";

@import url("//fonts.googleapis.com/css2?family=Poppins&display=swap");

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
  font-family: "Poppins", "Arial", sans-serif !important;
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

header article {
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
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
  margin-bottom: 0.5rem;
}

input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]),
select,
textarea {
  padding: 0.4rem 0.6rem !important;
}
input:not([type="checkbox"]):not([type="radio"]):not([type="range"]) {
  height: initial;
}

.toggle-password {
  position: relative;
}

.toggle-password-mask {
  position: absolute;
  right: 1rem;
  top: 40%;
  transform: translateY(-40%);
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;
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
  border-bottom: 1px solid transparent;
  font-size: 1rem;
  vertical-align: middle;
}

.nav-tabs li a,
.note-actions a,
.articl-actions a {
  text-decoration: none;
  height: 1.6rem;
  padding: 0 0.5rem;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-tabs li.active,
.active {
  border-color: #888;
}
.line-detail {
  background-color: var(--bg1);

  padding: 0 0.5rem;
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
