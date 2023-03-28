/*
Coding instructions for Chat GPT:

Can you rewite it in a more consistant style? Such as where variables are deined and stored?

Specifically -

Use Composition API
Add unit tests with Jest. I keep making edits that break something else, the tests should prevent that.
Use functional programming whenever possible
Use async/await
Use try/catch
Use global error handler
Use axios to make requests through an istance caklled axiosService
Identify places where I could better use the advice "don't repeat yourself" - moving functions that may be used in other to services
Suggest functions that can be abstracted so they can be used in other files.

What other suggestions do you have to improve the code?

Please include rewriting these instructions if they can be clearer or more distinct.

*/

import { createApp } from "vue";
import VueCookies from "vue-cookies";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import isLoggedInMixin from "./mixins/isLoggedInMixin";
import setTitleAndDescriptionMixin from "./mixins/setTitleAndDescriptionMixin";



import axiosInstance from "./services/axiosService";

const app = createApp(App);

app.use(router);


let secure = true;

if (window.location.hostname === "192.168.1.130" || window.location.hostname === "localhost") {
  secure = false;
}

app.use(VueCookies, {
  secure,
});

app.use(store);

/*
app.config.errorHandler = (error) => {
  store.dispatch('errors/setError', error);
};

window.addEventListener('unhandledrejection', (event) => {
  store.dispatch('errors/setError', event.reason);
});
*/

app.mixin(isLoggedInMixin);
app.mixin(setTitleAndDescriptionMixin);

axiosInstance.interceptors.request.use(
  (request) => {
    const req = request;
    const { accessTokenValue } = store.state.tokens;

    if (accessTokenValue && req.url !== "/auth/refresh-tokens") {
      req.headers.Authorization = `Bearer ${accessTokenValue}`;
    }

    return Promise.resolve(req);
  },
  (error) => error,
);

const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;

// Register unauthorized HTTP error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error;
    if (status === HTTP_UNAUTHORIZED) {
      try {
        // Attempt to refresh the access token
        await store.dispatch("tokens/refreshSession");
        // Retry the original request
        return axiosInstance(error.config);
      } catch (err) {
        // Logout user and redirect to login page
        store.dispatch("users/logout");
        router.push({ name: "login" });
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

// Register forbidden HTTP error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error;
    if (status === HTTP_FORBIDDEN) {
      router.push({ name: "Forbidden" });
    }
    return Promise.reject(error);
  },
);

app.mount("#app");
