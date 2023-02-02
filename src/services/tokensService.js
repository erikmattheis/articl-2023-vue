import VueCookies from 'vue-cookies';
import axiosInstance from '@/services/axiosService';

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

const renewJWTSession = async (refreshTokenValue) => {
  const result = await axiosInstance({
    method: 'POST',
    url: '/auth/refresh-tokens',
    data: {
      refreshTokenValue,
    },
  });

  return result.data.tokens;
};

export {
  getToken, clearTokens, setToken, setTokens, renewJWTSession,
};
