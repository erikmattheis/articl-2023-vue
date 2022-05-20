import store from "@/store/index";
import localStorageService from "@/services/localStorageService";

function getAccessTokenExpires() {
  let accessTokenExpires = store.getters["tokens/accessTokenExpires"];
  if (!accessTokenExpires) {
    accessTokenExpires = localStorageService.get("accessTokenExpires");
    if (accessTokenExpires) {
      store.dispatch("tokens/accessTokenExpires", accessTokenExpires);
    }
  }
  return accessTokenExpires;
}

function getAccessTokenValue() {
  let accessTokenValue = store.getters["tokens/accessTokenValue"];
  if (!accessTokenValue) {
    accessTokenValue = localStorageService.get("accessTokenValue");
    if (accessTokenValue) {
      store.dispatch("tokens/accessTokenValue", accessTokenValue);
    }
  }
  return accessTokenValue;
}

function getRefreshTokenExpires() {
  let refreshTokenExpires = store.getters["tokens/refreshTokenExpires"];
  if (!refreshTokenExpires) {
    refreshTokenExpires = localStorageService.get("refreshTokenExpires");
    if (refreshTokenExpires) {
      store.dispatch("tokens/refreshTokenExpires", refreshTokenExpires);
    }
  }
  return refreshTokenExpires;
}

function getRefreshTokenValue() {
  let refreshTokenValue = store.getters["tokens/refreshTokenValue"];
  if (!refreshTokenValue) {
    refreshTokenValue = localStorageService.get("refreshTokenValue");
    if (refreshTokenValue) {
      store.dispatch("tokens/refreshTokenValue", refreshTokenValue);
    }
  }
  return refreshTokenValue;
}

function setTokensInVuex(val) {
  if (val?.access?.token) {
    store.dispatch("tokens/accessTokenValue", val.access.token);
    store.dispatch("tokens/accessTokenExpires", val.access.expires);
    store.dispatch("tokens/refreshTokenValue", val.refresh.token);
    store.dispatch("tokens/refreshTokenExpires", val.refresh.expires);
  }
}

function setTokensInLocalStorage(val) {
  if (val?.access?.token) {
    localStorageService.set("accessTokenValue", val.access.token);
    localStorageService.set("accessTokenExpires", val.access.expires);
    localStorageService.set("refreshTokenValue", val.refresh.token);
    localStorageService.set("refreshTokenExpires", val.refresh.expires);
  }
}

function convertStringDatesToMS(serverResult) {
  if (serverResult?.data?.tokens) {
    const result = JSON.parse(JSON.stringify(serverResult));
    result.data.tokens.access.expires = Date.parse(
      result.data.tokens.access.expires
    );
    result.data.tokens.refresh.expires = Date.parse(
      result.data.tokens.refresh.expires
    );
    return result;
  }
  return {};
}

function setTokens(response) {
  const result = convertStringDatesToMS(response);
  setTokensInLocalStorage(result.data.tokens);
  setTokensInVuex(result.data.tokens);
}

export {
  getAccessTokenExpires,
  getAccessTokenValue,
  getRefreshTokenExpires,
  getRefreshTokenValue,
  setTokensInVuex,
  setTokensInLocalStorage,
  convertStringDatesToMS,
  setTokens,
};
