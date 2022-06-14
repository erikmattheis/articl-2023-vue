import "core-js/actual/array/group-by";

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { createApp } from "vue";
import VueCookies from "vue-cookies";

import { getAccessTokenValue, getRefreshTokenValue, setTokens } from "@/services/tokensService";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";

const app = createApp(App);

let baseURL;
let secure = true;

if (window.location.hostname === "192.168.1.130" || window.location.hostname === "localhost") {

  baseURL = "http://localhost:5000/v1";

  secure = false;

} else if (process.env.NODE_ENV === "development") {

  baseURL = "https://articl-api-dev.herokuapp.com/v1";

} else {

  baseURL = "https://api.articl.net/v1";

}

app.config.globalProperties.$http = axios.create({
  baseURL,
});

app.config.globalProperties.$http.interceptors.request.use(
  (request) => {

    const req = request;
    const accessTokenValue = getAccessTokenValue();

    if (accessTokenValue && req.url !== "/auth/refresh-tokens") {

      req.headers.Authorization = `Bearer ${accessTokenValue}`;

    }

    return Promise.resolve(req);

  },
  (error) => { return error; },
);

const refreshAuthLogic = async (failedRequest) => {

  if (!getRefreshTokenValue() || failedRequest.isRetry) {

    return Promise.resolve();

  }

  const tokens = await axios({
    method: "POST",
    url: `${baseURL}/auth/refresh-tokens`,
    data: {
      refreshToken: getRefreshTokenValue(),
    },
  });

  setTokens(tokens.data);

  // eslint-disable-next-line no-param-reassign
  failedRequest.response.config.headers.Authorization = `Bearer ${getAccessTokenValue()}`;

  // eslint-disable-next-line no-param-reassign
  failedRequest.isRetry = true;

  return Promise.resolve();

};

createAuthRefreshInterceptor(app.config.globalProperties.$http, refreshAuthLogic);

app.use(router);

app.use(VueCookies, {
  secure,
});

app.use(store);

export default app;

app.mount("#app");
