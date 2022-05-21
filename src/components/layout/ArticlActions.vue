<template>
  <nav>
    <ul class="right">
      <li v-if="!expanded">
        <a href @click.prevent="expanded = true"
          ><vue-feather size="2rem" type="menu" aria-label="Actions"/ ></a
        >
      </li>
      <li v-if="expanded">
        <a href @click.prevent="expanded = false"
          ><vue-feather size="2rem" type="x" aria-label="Actions"/ ></a
        >
      </li>
    </ul>
    <ul class="above right" v-if="expanded">
      <li>
        <router-link :to="{ name: 'articlEdit' }">
          edit
          <vue-feather
            size="2rem"
            type="search"
            aria-label="Search"
          ></vue-feather>
        </router-link>
        <router-link :to="{ name: 'articlDelete', id: id }">
          delete
          <vue-feather
            size="2rem"
            type="search"
            aria-label="Search"
          ></vue-feather>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import VueFeather from "vue-feather";
import { mapGetters } from "vuex";
import localStorageService from "@/services/localStorageService";
import { getRefreshTokenValue } from "@/services/tokenService";

export default {
  components: {
    VueFeather,
  },
  data() {
    return {
      theme: "light",
      li: this.$store.getters.isLoggedIn,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "tokens/isLoggedIn",
      accessTokenExpires: "tokens/accessTokenExpires",
      refreshTokenExpires: "tokens/refreshTokenExpires",
    }),
  },
  mounted() {
    const theme = localStorageService.get("data-theme");
    this.theme = theme !== "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
  },
  methods: {
    async logout() {
      const refreshToken = getRefreshTokenValue();
      if (refreshToken) {
        await this.$http({
          method: "POST",
          url: "/auth/logout",
          data: {
            refreshToken,
          },
        });
        localStorage.clear();
        this.$store.dispatch("tokens/logout");
      } else {
        localStorage.clear();
        this.$store.dispatch("tokens/logout");
      }
    },
  },
};
</script>

<style scoped>
.above {
  position: absolute;
  top: 0;
  right: 0;
}
svg {
  width: 2rem;
  height: 2rem;
}
.a {
  fill: #039be5;
}
articl nav {
  overflow: auto;
}
</style>
