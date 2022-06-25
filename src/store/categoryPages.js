export default {
  namespaced: true,

  state: () => {

    return {
      articls: [],
      articlTypes: [],
      categories: [],
      notes: [],
    };

  },

  mutations: {
    SET_CATEGORIES: (state, payload) => {

      state.categories = payload;

    },
    SET_ARTICLS: (state, payload) => {

      state.articls = payload;

    },
    SET_ARTICL_TYPES: (state, payload) => {

      state.articlTypes = payload;

    },
    SET_NOTES: (state, payload) => {

      state.notes = payload;

    },
  },

  actions: {
    categories: (context, payload) => {

      context.commit("SET_CATEGORIES", payload);

    },
    articls: (context, payload) => {

      context.commit("SET_ARTICLS", payload);

    },
    articlTypes: (context, payload) => {

      context.commit("SET_ARTICL_TYPES", payload);

    },
    notes: (context, payload) => {

      context.commit("SET_NOTES", payload);

    },
  },
  getters: {

    categories: (state) => {

      return state.categories;

    },

    articls: (state) => {

      return state.articls;

    },

    articlTypes: (state) => {

      return state.articlTypes;

    },

    notes: (state) => {

      return state.notes;

    },

  },
};