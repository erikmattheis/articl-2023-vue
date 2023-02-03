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
    },
  },

  actions: {
    setUser: (context, payload) => {
      context.commit('SET_USER', payload);
    },

    async login({ dispatch }, { username, password }) {
      try {
        const response = await userLogin({ username, password });
        const { data } = response;
        const tokens = convertStringDatesToMS(data.tokens);
        dispatch('tokens/setTokens', tokens, { root: true });
      } catch (error) {
        throw new Error(error);
      }
    },
    async logout({ dispatch, commit, rootGetters }) {
      try {
        const accessToken = rootGetters['tokens/accessTokenValue'];
        dispatch('tokens/clearTokens', { rememberMe: true }, { root: true });
        commit('CLEAR_USER');
        await userLogout({ accessToken });
      } catch (error) {
        dispatch('errors/setError', error, { root: true });
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
