export default {
  namespaced: true,

  state: () => {

    return {
      isEmailVerified: undefined,
      user: undefined,
      userFullName: undefined,
      userId: undefined,
    };

  },

  mutations: {
    SET_USER: (state, payload) => {

      state.user = payload;

    },
  },

  actions: {
    setUser: (context, payload) => {

      context.commit("SET_USER", payload);

    },
  },
  getters: {

    isEmailVerified: (state) => {

      return state.user.isEmailVerified;

    },

    user: (state) => {

      return state.user;

    },

    userFullName: (state) => {

      return `${state.user.nameFirst} ${state.user.nameLast}`;

    },

    userId: (state) => {

      return state.user.id;

    },

  },
};
