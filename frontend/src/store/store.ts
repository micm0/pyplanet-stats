import Vue from "vue";
import Vuex from "vuex";
import config from "../../public/config.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    config: config,
    showCps: false,
    rowsPerPage: 10
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_SHOWCPS(state, payload) {
      state.showCps = payload;
    }
  }
});
