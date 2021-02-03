import Vue from "vue";
import Vuex from "vuex";
import config from "../../public/config.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    config: config
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    }
  }
});
