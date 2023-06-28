<template>
  <ul class="nav-tabs">

    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ name: 'ArticlsList' }">
      <li :class="{ active: isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()"> Articls </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ name: 'TabNotes' }">
      <li :class="{ active: isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()"> Notes </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ name: 'TabQuestionsAnswers' }">
      <li :class="{ active: isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()"> Q&amp;A </a>
      </li>
    </router-link>

  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      treeLevel: "resources/treeLevel",
    }),
  },
  methods: {

  },
};
</script>
