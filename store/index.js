import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      user: {}
    },

    getters: {
      getUser(state) {
        return state.user;
      }
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
      }
    },
    actions: {}
  });

export default store;
