import { login, logout } from '../services/userService';

export default {
  namespaced: true,

  state: () => ({
    isEmailVerified: undefined,
    username: undefined,
    id: undefined,
  }),

  mutations: {
    SET_USER(state, user) {
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
        const { data } = await login({ username, password });
        commit('SET_USER', data);
      } catch (error) {
        throw new Error(error);
      }
    },

    async logout({ commit }) {
      try {
        const { refreshToken } = this.$store.state;
        await logout({ refreshToken });
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
