<template>
  <div>
    <div class="container">
      <div>
        <p v-if="$route.name==='editQAndASuccess' && QAndA?.id === $route.params.id"><ins>Your QAndA was successfully updated.</ins></p>
        <p>{{ QAndA.fullText }}</p>
        <small>–{{ QAndA.author?.nameFirst }} {{ QAndA.author?.nameLast }} {{ QAndADate }}</small>
      </div>
      <div v-if="QAndAIsUsers && isLoggedInMixin"
class="box">
        <div class="row-admin-box">
          <router-link
            role="button"
            :to="{ name: 'editQAndA', params:{ id: QAndA.id }}">
            <vue-feather
              size="0.7rem"
              type="edit"
              aria-label="Edit QAndA" />
          </router-link>

          <router-link
            role="button"
            :to="{ name: 'deleteQAndA', params: { id: QAndA?.id }}">
            <vue-feather
              size="0.7rem"
              type="delete"
              aria-label="Delete QAndA" />
          </router-link>
        </div>
      </div>
    </div>

    <QAndAs-form
      v-if="routeName === 'editQAndA' && QAndA?.id === $route.params.id && user.id === QAndA.author.id"
      :passed-QAndA="QAndA"
      @QAndA-updated="QAndAUpdated" />

    <QAndAs-delete
      v-else-if="routeName === 'deleteQAndA' && QAndA?.id === $route.params.id && user.id === QAndA.author.id"
      :passed-QAndA="QAndA" />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueFeather from "vue-feather";
import QAndAsDelete from "@/components/layout/QAndAsDelete.vue";
import QAndAsForm from "@/components/layout/QAndAsForm.vue";

export default {
  name: "QAndAListItem",
  components: {
    QAndAsDelete,
    QAndAsForm,
    VueFeather,
  },
  props: {
    passedQAndA: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      QAndA: {},
      confirmDelete: false,
      QAndAIsUsers: false,
    };
  },
  emits: ["QAndA-updated"],
  computed: {
    ...mapGetters({
      user: "users/user",
    }),
    routeName() {
      return this.$route.name;
    },
  },

  beforeMount() {
    if (this.passedQAndA.id) {
      this.QAndA = this.passedQAndA;
      this.QAndAIsUsers = this.passedQAndA?.author?.id === this.user?.id;
    }
  },
  /*
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter');
    next((vm) => {
      const module = vm;
      module.loaded = true; // set the "loaded" flag on the component instance
    });
  },
  beforeRouteLeave(to, from, next) {

    if (this.loaded && to.params.id === this.QAndA.id) {
      this.QAndACreated = false;
      this.buttonDisabled = false;

      this.fullTextOriginal = this.fullText;
      this.QAndA.fullText = this.fullText;
      this.isLoading = false;
      this.formAction = false;
    }
    next();
  },
  */
  methods: {
    QAndAUpdated(QAndA) {
      console.log("passing uop");
      this.QAndAWasUpdated = true;
      console.log("passing uop 2");
      this.$emit("QAndA-updated", QAndA);
      console.log("passing uop 3");
    },
  },
};
</script>
<style scoped type="scss">
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: minmax(min-content, 1fr) min-content;
    color: #444;
    border-bottom: 1px solid var(--muted-border-color);
  }

</style>
