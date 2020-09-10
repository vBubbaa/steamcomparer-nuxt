import axios from "axios";

export const state = () => ({
  user: {},
  friendList: {}
});

export const mutations = {
  // Set user to state
  SET_USER(state, user) {
    state.user = user;
  },

  SET_FRIEND_LIST(state, friendList) {
    state.friendList = friendList.friends;
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
  },

  getFriendList(state) {
    return state.friendList;
  }
};

export const actions = {
  async fetchFriendList({ commit }, sid) {
    const res = await this.$axios.get(`/api/user/friendselect/${sid}/`);
    console.log(res);
    commit("SET_FRIEND_LIST", res.data);
  }
};
