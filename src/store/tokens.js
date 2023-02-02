import {
  clearJWTTokens, getJWTToken, setJWTTokens, refreshJWTSession,
} from '@/services/tokensService';

export default {
  namespaced: true,

  state: () => ({
    accessTokenExpires: getJWTToken('accessTokenExpires'),
    accessTokenValue: getJWTToken('accessTokenValue'),
    refreshTokenExpires: getJWTToken('refreshTokenExpires'),
    refreshTokenValue: getJWTToken('refreshTokenValue'),
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
      setJWTTokens(payload);
    },
    clearTokens: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_EXPIRES', '');
      context.commit('SET_ACCESS_TOKEN_VALUE', '');
      if (!payload.rememberMe) {
        context.commit('SET_REFRESH_TOKEN_EXPIRES', '');
        context.commit('SET_REFRESH_TOKEN_VALUE', '');
        clearJWTTokens(payload.rememberMe);
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

    async refreshSession({ state }) {
      console.log('refreshSession action called');
      const { refreshTokenValue } = state;
      const tokens = await refreshJWTSession(refreshTokenValue);
      setJWTTokens(tokens);
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
