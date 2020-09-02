import axios from "axios";

export const state = () => ({
  user: {}
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {};

export const getters = {
  getUser(state) {
    return state.user;
  }
};
