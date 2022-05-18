import { createStore } from "vuex";
import modals from "./modals";
import errors from "./errors";
import tokens from "./tokens";
import users from "./users";
import articlsParams from "./articlsParams";

export default createStore({
  namespaced: true,
  modules: {
    articlsParams,
    errors,
    modals,
    tokens,
    users,
  },
});
