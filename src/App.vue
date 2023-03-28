<template>
  <div class="vertical-container">
    <the-header />
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
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
 *  538, 3250, 3,623, 3,910, 5,475, 6109 .vue
 *

 vue  49  6,109  440  767  7,316
JavaScript  18  1,098  56  269  1,423. 1098
SCSS  4  124  164  64  352
 *
 * NODE
 * 2706,2,487, 2,553, 3842 .js
 *
 * 4/15, 5/20, 6/1, 6
 * 5183,6937,7420, ,112
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
  data: () => ({}),
  mounted() {
    const user = this.$cookies.get("user");
    if (user) {
      this.$store.dispatch("users/setUser", user);
    }
  },
  methods: {},
};
</script>

<style lang="scss">
@import "./assets/variables";
@import "~/node_modules/@picocss/pico/scss/pico.scss";
@import "./assets/maxwidth.scss";
@import "./assets/styles-override.scss";
@import "//fonts.googleapis.com/css2?family=Open+Sans&display=swap";

.smaller {
  font-size: 0.7rem;
}

.inline-block {
  display: inline;
}

.row-admin-container {
  display: grid;
  grid-template-columns: 1fr min-content;
}

.row-auto-container {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-items: start;
  grid-auto-rows: max-content;
}

.item-auto-box {
  padding: 0.25em 0.5em;
  background-color: var(--primary);
  color: white;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.row-admin-box {
  display: grid;
  grid-template-columns: min-content min-content min-content;
  grid-gap: 2px;
  padding: 0 5px;
}

.row-admin-box > a {
  padding: 0 5px !important;
}

.fade-enter-active {
  transition: opacity 0.1s ease;
  transition-delay: 0.1s;
}

.fade-leave-active {
  transition: opacity 0.1s ease;
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

.nav-tabs-margin {
  margin: calc(var(--nav-element-spacing-vertical) * 0.5) calc(var(--nav-element-spacing-vertical) * 0.5);
}

.nav-tabs-inner-margin {
  margin: 0 calc(var(--nav-element-spacing-vertical) * 0.5);
}

.nav-tabs li.active,
.active {
  border: 1px solid $grey-100;
  border-bottom: 1px solid var(--background-color);
}

.nav-tabs {
  margin-bottom: 0;
  position: relative;
  z-index: 10;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
}

.nav-tabs li,
.note-actions li,
.articl-actions li {
  border-width: 1px;
  border-right-width: 0;
  border-style: solid;
  border-color: $grey-100;
  border: 1px solid transparent;
  display: flex;
  padding: var(--nav-element-spacing-horizontal);
  vertical-align: middle;
  margin-bottom: 0;
  column-gap: 0;
}

.nav-tabs li:last-child,
.note-actions li:last-child,
.articl-actions li:last-child {
  border-right-width: 1px;
}

.articl-actions a,
.note-actions a,
.nav-tabs li a {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  text-decoration: none;
  background-color: transparent;
}

.nav-content {
  position: relative;
  top: -1px;
  z-index: 0;
  border: 1px solid $grey-100;
  padding: var(--spacing);
}

.nav-inner-content {
  position: relative;
  top: -1px;
  z-index: 0;
  border: 1px solid $grey-100;
  padding: calc(var(--spacing) * 0.25);
  padding-top: var(--spacing);
}

@media (max-width: map-get($breakpoints, "sm")) {
  article {
    padding: calc(var(--block-spacing-horizontal) * 0.25);
  }

  .nav-tabs-margin {
    margin: calc(var(--nav-element-spacing-vertical) * 0.5) calc(var(--nav-element-spacing-vertical) * 0.5);
  }

  .nav-tabs-inner-margin {
    margin: 0 calc(var(--nav-element-spacing-vertical) * 0.5);
  }

  .nav-tabs li.active,
  .active {
    border: 1px solid $grey-100;
    border-bottom: 1px solid var(--background-color);
  }

  .nav-tabs li:last-child,
  .note-actions li:last-child,
  .articl-actions li:last-child {
    border-right-width: 1px;
  }

  .articl-actions a,
  .note-actions a,
  .nav-tabs li a {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 0 1rem;
    text-decoration: none;
    background-color: transparent;
  }

  .nav-content {
    padding: calc(var(--nav-element-spacing-horizontal) * 0.25);
  }

  .articl ul,
  .nav-content ul li {
    padding-left: calc(var(--nav-element-spacing-horizontal) * 0.25) !important;
  }
}

.right {
  float: right;
}

.sr {
  display: inline-block;
  line-height: 0.5rem;
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
  vertical-align: middle;
  //padding: calc(var(--form-element-spacing-horizontal) * 0.5);
  height: 2.2rem;
  position: absolute;
  top: calc(var(--form-element-spacing-vertical) * 0.5);
  right: 1rem;
  width: 2.2rem;
  top: 50%;
  transform: translateY(-50%);
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

body > div {
  margin: auto;
}

:root footer article {
  margin-bottom: 0;
  margin-top: 0;
}

:root header article {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}

[role=button] {
  margin-right: calc(var(--spacing) * .5);
}

input:not([type="checkbox"], [type="radio"], [type="range"]) {
  height: initial;
}

input:not([type="checkbox"], [type="radio"], [type="range"], [type="file"]),
select,
textarea {
  padding: calc(var(--form-element-spacing-vertical) * 0.5) calc(var(--form-element-spacing-horizontal) * 0.5);
}

input[role="switch"],
input[type="radio"] {
  border-radius: 1rem !important;
}

:root main article {
  margin-bottom: 0;
  margin-top: 0;
  padding-top: 0;
}

article h2,
main form {
  margin-bottom: var(--block-spacing-vertical);
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
