export default {
  namespaced: true,

  state: () => ({
    articls: [],
    articlTypes: [],
    categories: [],
    notes: [],
    QAndAs: [],
    treeLevel: undefined,
    breadcrumbs: [],
    count: 0,
  }),

  mutations: {
    SET_COUNT: (state, payload) => {
      state.count = payload;
    },
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
    SET_BREADCRUMBS: (state, payload) => {
      state.breadcrumbs = payload;
    },
  },

  actions: {
    count: (context, payload) => {
      context.commit('SET_COUNT', payload);
    },
    categories: (context, payload) => {
      context.commit('SET_CATEGORIES', payload);
    },
    articls: (context, payload) => {
      context.commit('SET_ARTICLS', payload);
    },
    articlTypes: (context, payload) => {
      context.commit('SET_ARTICL_TYPES', payload);
    },
    notes: (context, payload) => {
      context.commit('SET_NOTES', payload);
    },
    setNote(context, payload) {
      const { notes } = context.state;

      const newNotes = notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
      context.commit('SET_NOTES', newNotes);
    },
    addNote: (context, payload) => {
      const { notes } = context.state;
      const newNotes = notes.unshift(payload);
      context.commit('SET_NOTES', newNotes);
    },
    breadcrumbs: (context, payload) => {
      context.commit('SET_BREADCRUMBS', payload);
    },
    removeNote: (context, payload) => {
      const { notes } = context.state;
      const newNotes = notes.filter((note) => note.id !== payload);
      context.commit('SET_NOTES', newNotes);
    },
  },
  getters: {

    count: (state) => state.count,

    categories: (state) => state.categories,

    articls: (state) => state.articls,

    QAndAs: (state) => state.QAndAs,

    articlTypes: (state) => state.articlTypes,

    notes: (state) => state.notes,

    treeLevel: (state) => state.breadcrumbs.length,

    breadcrumbs: (state) => state.breadcrumbs,

  },
};
