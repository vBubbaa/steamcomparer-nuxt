import axios from "axios";

export const state = () => ({
  user: {}
});

export const mutations = {
  // Set user to state
  SET_USER(state, user) {
    state.user = user;
  },

  // Logout user by clearing state + cookie
  LOGOUT(state) {
    state.user = {};
    document.cookie =
      "steam_data" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
};

export const getters = {
  getUser(state) {
    return state.user;
  }
};
