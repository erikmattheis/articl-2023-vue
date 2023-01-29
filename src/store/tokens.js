import { clearTokens, getToken, setTokens } from '../services/tokensService';

export default {
  namespaced: true,

  state: () => ({
    accessTokenExpires: getToken('accessTokenExpires'),
    accessTokenValue: getToken('accessTokenValue'),
    refreshTokenExpires: getToken('refreshTokenExpires'),
    refreshTokenValue: getToken('refreshTokenValue'),
  }),

  mutations: {

    SET_ACCESS_TOKEN_VALUE: (state, payload) => {
      state.accessTokenValue = payload;
    },

    SET_ACCESS_TOKEN_EXPIRES: (state, payload) => {
      state.accessTokenExpires = payload;
    },

    SET_REFRESH_TOKEN_VALUE: (state, payload) => {
      state.refreshTokenValue = payload;
    },

    SET_REFRESH_TOKEN_EXPIRES: (state, payload) => {
      state.refreshTokenExpires = payload;
    },
  },

  actions: {
    setTokens: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_EXPIRES', payload.access.expires);
      context.commit('SET_ACCESS_TOKEN_VALUE', payload.access.token);
      context.commit('SET_REFRESH_TOKEN_EXPIRES', payload.refresh.expires);
      context.commit('SET_REFRESH_TOKEN_VALUE', payload.refresh.token);
      setTokens(payload);
    },
    clearTokens: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_EXPIRES', '');
      context.commit('SET_ACCESS_TOKEN_VALUE', '');
      if (!payload.rememberMe) {
        context.commit('SET_REFRESH_TOKEN_EXPIRES', '');
        context.commit('SET_REFRESH_TOKEN_VALUE', '');
        clearTokens(payload.rememberMe);
      }
    },
    accessTokenExpires: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_EXPIRES', payload);
    },

    accessTokenValue: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_VALUE', payload);
    },

    refreshTokenExpires: (context, payload) => {
      context.commit('SET_REFRESH_TOKEN_EXPIRES', payload);
    },

    refreshTokenValue: (context, payload) => {
      context.commit('SET_REFRESH_TOKEN_VALUE', payload);
    },

  },

  getters: {

    tokens: (state) => ({
      accessTokenExpires: state.accessTokenExpires * 1000,
      accessTokenValue: state.accessTokenValue,
      refreshTokenExpires: state.refreshTokenExpires * 1000,
      refreshTokenValue: state.refreshTokenValue,
    }),

    accessTokenExpires: (state) => state.accessTokenExpires * 1000,

    accessTokenValue: (state) => state.accessTokenValue,

    refreshTokenExpires: (state) => state.refreshTokenExpires * 1000,

    refreshTokenValue: (state) => state.refreshTokenValue,
  },

};
