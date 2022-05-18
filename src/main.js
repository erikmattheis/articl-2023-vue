import "core-js/actual/array/group-by";
import { createApp } from "vue";
import axios from "axios";
import router from "./router";
import store from "./store/index";

import App from "./App.vue";

const app = createApp(App);

let baseURL;

if (
  window.location.hostname === "192.168.1.130" ||
  window.location.hostname === "localhost"
) {
  baseURL = "http://localhost:5000/v1";
} else if (process.env.NODE_ENV === "development") {
  baseURL = "https://articl-api-dev.herokuapp.com/v1";
} else {
  baseURL = "https://api.articl.net/v1";
}

app.config.globalProperties.$http = axios.create({
  baseURL,
});

app.config.globalProperties.$http.interceptors.request.use(
  function (request) {
    const req = request;
    const accessTokenValue = store.getters["tokens/accessTokenValue"];

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
      store.dispatch("errors/setError", error);
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
    }
  );
}

createAxiosResponseInterceptor();

app.mount("#app");
