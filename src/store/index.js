import { createStore } from "vuex";
import articlsParams from "./articlsParams";
import errors from "./errors";
import modals from "./modals";
import metas from "./metas";
import tokens from "./tokens";
import users from "./users";

export default createStore({
  namespaced: true,
  modules: {
    articlsParams,
    errors,
    modals,
    metas,
    tokens,
    users,
  },
});
