import { login as userLogin, logout as userLogout } from '../services/userService';
import { convertStringDatesToMS } from '../services/stringsService';

export default {
  namespaced: true,

  state: () => ({
    isEmailVerified: undefined,
    username: undefined,
    id: undefined,
    user: undefined,
  }),

  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.username = user.username;
      state.id = user.id;
    },

    CLEAR_USER(state) {
      state.username = '';
      state.id = null;
      state.authenticated = false;
    },
  },

  actions: {
    setUser: (context, payload) => {
      context.commit('SET_USER', payload);
    },

    async login({ commit }, { username, password }) {
      try {
        const response = await userLogin({ username, password });
        const { data } = response;
        commit('SET_USER', data.user);
        const tokens = convertStringDatesToMS(data.tokens);
        commit('tokens/SET_ACCESS_TOKEN_EXPIRES', tokens.access.expires, { root: true });
        commit('tokens/SET_ACCESS_TOKEN_VALUE', tokens.access.value, { root: true });
        commit('tokens/SET_REFRESH_TOKEN_EXPIRES', tokens.refresh.expires, { root: true });
        commit('tokens/SET_REFRESH_TOKEN_VALUE', tokens.refresh.value, { root: true });
        // commit('SET_TOKENS', tokens);
      } catch (error) {
        throw new Error(error);
      }
    },
    async logout({ commit, state }) {
      try {
        const { refreshToken } = state;
        await userLogout({ refreshToken });
        commit('CLEAR_USER');
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  getters: {

    isEmailVerified: (state) => state.isEmailVerified,

    user: (state) => state.user,

    id: (state) => state.id,

    username: (state) => state.username,

  },
};
