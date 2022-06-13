import VueCookies from "vue-cookies";

import store from "@/store";

const getAccessTokenExpires = () => {

  const accessTokenExpires = VueCookies.get("accessTokenExpires");

  if (accessTokenExpires) {

    store.dispatch("tokens/accessTokenExpires", accessTokenExpires);

  }

  return accessTokenExpires;

};
const getAccessTokenValue = () => {

  const accessTokenValue = VueCookies.get("accessTokenValue");

  if (accessTokenValue) {

    store.dispatch("tokens/accessTokenValue", accessTokenValue);

  }

  return accessTokenValue;

};
const getRefreshTokenExpires = () => {

  const refreshTokenExpires = VueCookies.get(
    "refreshTokenExpires",
  );

  if (refreshTokenExpires) {

    store.dispatch("tokens/refreshTokenExpires", refreshTokenExpires);

  }

  return refreshTokenExpires;

};
const getRefreshTokenValue = () => {

  const refreshTokenValue = VueCookies.get("refreshTokenValue");

  if (refreshTokenValue) {

    store.dispatch("tokens/refreshTokenValue", refreshTokenValue);

  }

  return refreshTokenValue;

};
const setTokensInVuex = (val) => {

  if (val?.access?.token) {

    store.dispatch("tokens/accessTokenValue", val.access.token);

    store.dispatch("tokens/accessTokenExpires", val.access.expires);

    store.dispatch("tokens/refreshTokenValue", val.refresh.token);

    store.dispatch("tokens/refreshTokenExpires", val.refresh.expires);

  }

};
const setTokensInLocalStorage = (val) => {

  if (val?.access?.token) {

    VueCookies.set("accessTokenValue", val.access.token);

    VueCookies.set("accessTokenExpires", val.access.expires);

    VueCookies.set("refreshTokenValue", val.refresh.token);

    VueCookies.set("refreshTokenExpires", val.refresh.expires);

  }

};
const convertStringDatesToMS = (serverResult) => {

  if (serverResult?.data?.tokens) {

    const result = JSON.parse(JSON.stringify(serverResult));

    console.log(result);

    result.data.tokens.access.expires = Date.parse(
      result.data.tokens.access.expires,
    );

    result.data.tokens.refresh.expires = Date.parse(
      result.data.tokens.refresh.expires,
    );

    return result;

  }

  return {
  };

};
const setTokens = (response) => {

  const result = convertStringDatesToMS(response);

  setTokensInLocalStorage(result.data.tokens);

  setTokensInVuex(result.data.tokens);

};

export {
  convertStringDatesToMS,
  getAccessTokenExpires,
  getAccessTokenValue,
  getRefreshTokenExpires,
  getRefreshTokenValue,
  setTokens,
  setTokensInLocalStorage,
  setTokensInVuex,
};
