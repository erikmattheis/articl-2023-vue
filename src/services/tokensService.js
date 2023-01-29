import VueCookies from 'vue-cookies';

const clearTokens = (rememberMe) => {
  VueCookies.remove('accessTokenValue');
  VueCookies.remove('accessTokenExpires');

  if (!rememberMe) {
    VueCookies.remove('refreshTokenValue');
    VueCookies.remove('refreshTokenExpires');
  }
};

const getToken = (key) => VueCookies.get(key);

const setToken = (key, value) => VueCookies.set(key, value);

const setTokens = (tokens) => {
  VueCookies.set('accessTokenValue', tokens.access?.token);
  VueCookies.set('accessTokenExpires', tokens.access?.expires);
  VueCookies.set('refreshTokenValue', tokens.refresh?.token);
  VueCookies.set('refreshTokenExpires', tokens.refresh?.expires);
};

export {
  getToken, clearTokens, setToken, setTokens,
};
