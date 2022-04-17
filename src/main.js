import { createApp } from "vue";
import axios from "axios";
import {
  getAccessTokenValue,
  getRefreshTokenValue,
  setTokens,
} from "@/services/tokenService";
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
    if (accessTokenValue) {
      req.headers.Authorization = `Bearer ${accessTokenValue}`;
    }
    return Promise.resolve(req);
  },
  (error) => Promise.reject(error)
);

app.use(router);

app.use(store);

function createAxiosResponseInterceptor() {
  const interceptor =
    app.config.globalProperties.$http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }

        app.config.globalProperties.$http.interceptors.response.eject(
          interceptor
        );
        const refreshToken = getRefreshTokenValue();
        if (!refreshToken) {
          router.push("auth//login");
          return Promise.reject(error);
        }

        return app.config.globalProperties.$http
          .post("/auth/refresh-tokens", {
            refreshToken,
          })
          .then((response) => {
            setTokens(response);
            const accessToken = getAccessTokenValue();
            app.config.globalProperties.$http.interceptors.response.config.headers[
              "Authorization"
            ] = "Bearer " + accessToken;
            return axios(error.response.config);
          })
          .catch((error) => {
            router.push("auth//login");
            return Promise.reject(error);
          })
          .finally(createAxiosResponseInterceptor);
      }
    );
}

createAxiosResponseInterceptor();

app.mount("#app");
