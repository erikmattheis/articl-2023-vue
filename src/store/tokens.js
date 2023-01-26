import VueCookies from 'vue-cookies';

export default {
  namespaced: true,

  state: () => ({
    accessTokenExpires: VueCookies.get('accessTokenExpires'),
    accessTokenValue: VueCookies.get('accessTokenValue'),
    refreshTokenExpires: VueCookies.get('refreshTokenExpires'),
    refreshTokenValue: VueCookies.get('refreshTokenValue'),
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
    },
    accessTokenExpires: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_EXPIRES', payload);
      VueCookies.set('accessTokenExpires', payload);
    },

    accessTokenValue: (context, payload) => {
      context.commit('SET_ACCESS_TOKEN_VALUE', payload);

      VueCookies.set('accessTokenValue', payload);
    },

    refreshTokenExpires: (context, payload) => {
      context.commit('SET_REFRESH_TOKEN_EXPIRES', payload);
      VueCookies.set('refreshTokenExpires', payload);
    },

    refreshTokenValue: (context, payload) => {
      context.commit('SET_REFRESH_TOKEN_VALUE', payload);
      VueCookies.set('refreshTokenValue', payload);
    },

  },

  getters: {

    accessTokenExpires: (state) => state.accessTokenExpires * 1000,

    accessTokenValue: (state) => state.accessTokenValue,

    refreshTokenExpires: (state) => state.refreshTokenExpires * 1000,

    refreshTokenValue: (state) => state.refreshTokenValue,
  },

};
