import "core-js/actual/array/group-by";
import { createApp } from "vue";
import axios from "axios";
//import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessTokenValue } from "@/services/tokenService";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

const app = createApp(App);

const baseURL =
  window.location.hostname === "192.168.1.130"
    ? "http://localhost:5000/v1"
    : "https://api.articl.net/v1";

app.config.globalProperties.$http = axios.create({
  baseURL,
});

app.config.globalProperties.$http.interceptors.request.use(
  function (request) {
    const req = request;
    const accessTokenValue = getAccessTokenValue();

    if (accessTokenValue && req.url !== "/auth/refresh-tokens") {
      req.headers.Authorization = `Bearer ${accessTokenValue}`;
    }
    return Promise.resolve(req);
  },
  (error) => Promise.reject(error)
);

app.use(router);

app.use(store);

function createAxiosResponseInterceptor() {
  app.config.globalProperties.$http.interceptors.response.use(
    (response) => response,
    (error) => {
      store.dispatch("setError", error);
      if (
        error?.response?.status === 401 &&
        router.currentRoute.path !== "/login"
      ) {
        router.push({
          name: "loginPage",
          query: {
            redirect: window.location.pathname + window.location.search,
          },
        });
        return Promise.reject(error);
      }

      return Promise.reject(error);
      /*
        app.config.globalProperties.$http.interceptors.response.eject(
          interceptor
        );

        const refreshToken = getRefreshTokenValue();
        console.log("refreshToken", refreshToken);
        if (!refreshToken) {
          return Promise.reject(error);
        }

        return app.config.globalProperties.$http
          .post("/auth/refresh-tokens", {
            refreshToken,
          })
          .then((response) => {
            console.log("a successful response from refresh-tokens");
            console.log("response", response);
            setTokens(response.data);
            const accessToken = getAccessTokenValue();
            app.config.globalProperties.$http.interceptors.response.config.headers[
              "Authorization"
            ] = "Bearer " + accessToken;
            console.log("error.response.config is", error.response.config);
            return app.config.globalProperties.$http(error.response.config);
          })
          .catch(() => {
            router.push({
              name: "loginPage",
              query: {
                redirect: window.location.pathname + window.location.search,
              },
            });
            return Promise.resolve(error);
          })
          .finally(createAxiosResponseInterceptor);
          */
    }
  );
}

createAxiosResponseInterceptor();

app.mount("#app");
