export default {
  namespaced: true,
  state: () => {

    return {
      metaDescription: undefined,
      documentTitle: undefined,
    };

  },
  mutations: {
    SET_DOCUMENT_TITLE: (state, payload) => {

      state.documentTitle = payload;

    },
    SET_META_DESCRIPTION: (state, payload) => {

      state.metaDescription = payload;

    },
  },
  actions: {
    setMetaDescriptionAndDocumentTitle: (context, {
      title, description,
    }) => {

      context.commit("SET_DOCUMENT_TITLE", title);

      context.commit("SET_META_DESCRIPTION", description);

    },
  },
  getters: {
    documentTitle: (state) => {

      return state.documentTitle;

    },
    metaDescription: (state) => {

      return state.metaDescription;

    },
  },
};
