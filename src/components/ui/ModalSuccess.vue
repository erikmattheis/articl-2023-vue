<template>
  <div
    v-if="successTitle"
    class="modal-container"
    @click.prevent="close()"
    @keyup.enter="close()"
  >
    <dialog
      open
      class="modal"
      @click.stop
    >
      <article class="max-container-width">
        <header>
          <a
            href="#close"
            aria-label="Close"
            class="close"
            @click.prevent="close()"
          />
          <h2>{{ successTitle }}</h2>
        </header>
        <section>
          <div
            class="tab"
            title="success"
          >
            <vue-feather
              size="3rem"
              type="check"
            />
          </div>
          <div class="info">
            <ul>
              <li v-if="successMessage">
                {{ successMessage }}
              </li>
            </ul>
          </div>
        </section>
        <button @click.prevent="close()">
          OK
        </button>
      </article>
    </dialog>
  </div>
</template>

<script>
import VueFeather from "vue-feather";
import { mapGetters } from "vuex";

export default {
  components: {
    VueFeather,
  },
  computed: {
    ...mapGetters({
      successTitle: "modals/successTitle",
      successMessage: "modals/successMessage",
    }),
  },
  methods: {
    close() {

      this.$store.dispatch("modals/clearSuccess");

    },
  },
};
</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  background-color: black;
}

.modal {
  width: 90%;
  margin: auto;
  background-color: white;
  border: 0.2rem;
}

article {
  max-width: 100%;
}

section {
  overflow: auto;
  white-space: nowrap;
}

section div {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}

.tab {
  width: 6rem;
  height: 6rem;
}

#app > div > dialog > article > section > div.info {
  min-width: calc(100% - 6rem);
  min-height: 6rem;
  padding: 1rem;
  color: #0071001a;
  background-color: #cfa;
}

.tab,
dialog article button {
  color: #fff;
  background-color: #00701a;
}

dialog article header a,
#app > div > dialog > article > header > a {
  color: #cfa;
}

dialog article header,
dialog article button:hover {
  background-color: #43a047;
  transition: background-color 0.5s ease;
}

dialog article header h2 {
  margin-bottom: 0;
  color: #fff;
}

dialog article ul li {
  word-break: break-all;
  white-space: pre-wrap;
}

html[data-theme="dark"] .modal-container {
  background-color: black;
}

html[data-theme="dark"] .modal {
  background-color: black;
}

html[data-theme="dark"] article {
  background-color: #141e26;
}

html[data-theme="dark"] #app > div > dialog > article > section > div.info,
html[data-theme="dark"]
#app
> div
> dialog
> article
> section
> div.info
ul
li {
  color: black !important;
  background-color: #cfa;
}
</style>
