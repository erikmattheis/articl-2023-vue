<template>
  <header>
    <article>
      <nav>
        <ul>
          <li>
            <router-link to="/"> Articl.net </router-link>
          </li>
        </ul>
        <ul class="right">
          <li v-if="isLoggedIn">
            <router-link to="/users/me"
              ><user-icon size="1.5x"></user-icon
            ></router-link>
            <a href="#" @click.prevent="logout" class="nav-user"> logout </a>
          </li>
          <li v-else>
            <router-link to="/login"
              ><user-icon size="1.5x"></user-icon
            ></router-link>
          </li>
        </ul>
      </nav>
    </article>
  </header>
</template>

<script>
import { UserIcon } from "@zhuowenli/vue-feather-icons";
import { mapGetters } from "vuex";
import localStorageService from "@/services/localStorageService";
import { getRefreshTokenValue } from "@/services/tokenService";

export default {
  components: {
    UserIcon,
  },
  data() {
    return {
      theme: "light",
      tokens: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "accessTokenExpires", "refreshTokenExpires"]),
  },
  mounted() {
    const theme = localStorageService.get("data-theme");
    this.theme = theme !== "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
  },
  methods: {
    logout() {
      const refreshToken = getRefreshTokenValue();
      if (refreshToken) {
        this.$http({
          method: "POST",
          url: "/auth/logout",
          data: {
            refreshToken,
          },
        })
          .then((result) => {
            if (result.data) {
              this.loggedin = false;
            }
          })
          .catch((error) => {
            this.$store.dispatch("setError", error);
          })
          .finally(() => {
            localStorage.clear();
            this.$store.dispatch("logout");
          });
      } else {
        this.loggedin = false;
        localStorage.clear();
        this.$store.dispatch("logout");
      }
    },
  },
};
</script>

<style scoped>
articl nav {
  overflow: auto;
}
.nav-user a {
  width: 5rem;
}
.nav-user {
  margin: 0 1rem;
}
</style>
