import store from "@/store/index";
import localStorageService from "@/services/localStorageService";

export function getAccessTokenExpires() {
  let { accessTokenExpires } = store.getters.tokens;
  if (!accessTokenExpires) {
    accessTokenExpires = localStorageService.get("accessTokenExpires");
    if (accessTokenExpires) {
      store.dispatch("tokens/accessTokenExpires", accessTokenExpires);
    }
  }
  return accessTokenExpires;
}

export function getAccessTokenValue() {
  let { accessTokenValue } = store.getters.tokens;
  if (!accessTokenValue) {
    accessTokenValue = localStorageService.get("accessTokenValue");
    if (accessTokenValue) {
      store.dispatch("tokens/accessTokenValue", accessTokenValue);
    }
  }
  return accessTokenValue;
}

export function getRefreshTokenExpires() {
  let { refreshTokenExpires } = store.getters.tokens;
  if (!refreshTokenExpires) {
    refreshTokenExpires = localStorageService.get("refreshTokenExpires");
    if (refreshTokenExpires) {
      store.dispatch("tokens/refreshTokenExpires", refreshTokenExpires);
    }
  }
  return refreshTokenExpires;
}

export function getRefreshTokenValue() {
  let { refreshTokenValue } = store.getters.tokens;
  if (!refreshTokenValue) {
    refreshTokenValue = localStorageService.get("refreshTokenValue");
    if (refreshTokenValue) {
      store.dispatch(
        "tokens/tokens/tokens/refreshTokenValue",
        refreshTokenValue
      );
    }
  }
  return refreshTokenValue;
}

export function setTokensInVuex(val) {
  if (val?.access?.token) {
    store.dispatch("tokens/accessTokenValue", val.access.token);
    store.dispatch("tokens/accessTokenExpires", val.access.expires);
    store.dispatch("tokens/refreshTokenValue", val.refresh.token);
    store.dispatch("tokens/refreshTokenExpires", val.refresh.expires);
  }
}

export function setTokensInLocalStorage(val) {
  if (val?.access?.token) {
    localStorageService.set("accessTokenValue", val.access.token);
    localStorageService.set("accessTokenExpires", val.access.expires);
    localStorageService.set("refreshTokenValue", val.refresh.token);
    localStorageService.set("refreshTokenExpires", val.refresh.expires);
  }
}

export function convertStringDatesToMS(serverResult) {
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

export function setTokens(response) {
  const result = convertStringDatesToMS(response);
  setTokensInLocalStorage(result.data.tokens);
  setTokensInVuex(result.data.tokens);
}
