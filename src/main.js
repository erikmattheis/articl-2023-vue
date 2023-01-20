/*
Coding instructions for Chat GPT:

Can you rewite it in a more consistant style? Such as where variables are deined and stored?

Specifically -

Use async/await
Use try/catch
Use global error handler
Use axios to make requests
Identify places where I could better use the advice "don't repeat yourself" - moving functions that may be used in other to services
Suggest functions that can be abstracted so they can be used in other files.

What other suggestions do you have to improve the code?

*/

import 'core-js/actual/array/group-by';

import axios from 'axios';
// import createAuthRefreshInterceptor from "axios-auth-refresh";
import { createApp } from 'vue';
import VueCookies from 'vue-cookies';

import { getAccessTokenValue, getRefreshTokenExpires } from '@/services/tokensService';

import App from './App.vue';
import router from './router';
import store from './store/index';

const app = createApp(App);

let baseURL = '';
let secure = true;

if (window.location.hostname === '192.168.1.130' || window.location.hostname === 'localhost') {
  baseURL = 'http://localhost:5000/v1';

  secure = false;
} else if (window.location.hostname === 'articl-vue-dev.herokuapp.com') {
  baseURL = 'https://articl-api-dev.herokuapp.com/v1';
} else {
  baseURL = 'https://api.articl.net/v1';
}

app.config.globalProperties.$http = axios.create({
  baseURL,
});

app.config.globalProperties.$http.interceptors.request.use(
  (request) => {
    const req = request;
    const accessTokenValue = getAccessTokenValue();

    if (accessTokenValue && req.url !== '/auth/refresh-tokens') {
      req.headers.Authorization = `Bearer ${accessTokenValue}`;
    }

    return Promise.resolve(req);
  },
  (error) => error,
);
/*
app.config.globalProperties.$http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
      if (
        accessTokenExpires()
        && refreshTokenExpires()
        && Date.now() > refreshTokenExpires
      ) {
        // refresh token has expired, redirect to login page
        // logout();
        router.push({ name: 'login' });
        return Promise.reject(error);
      }

      // try to renew the session
      try {
        await renewSession();
        // retry the original request
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
*/
app.config.globalProperties.$http.interceptors.response.use(async (response) => response, async (error) => {
  const { status } = error.response;
  if (status === 401) {
    // check if refresh token is still valid
    if (getRefreshTokenExpires() > Date.now()) {
      console.log('refresh token is still valid, renew the session');
      try {
        await store.dispatch('renewSession');
        return axios(error.config);
      } catch (err) {
        // session renewal failed, redirect to login page
        store.dispatch('logout');
        router.push({ name: 'login' });
      }
    }
    // refresh token is expired, redirect to login page
    store.dispatch('logout');
    router.push({ name: 'login' });
  }
  return Promise.reject(error);
});

app.use(router);

app.use(VueCookies, {
  secure,
});

app.use(store);

app.mount('#app');
