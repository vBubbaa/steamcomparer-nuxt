export const state = () => ({
  user: {},
  friendList: {},
  comparedFriends: []
});

export const mutations = {
  // Set compared SIDS, so we can save the ids if we click and game on the compare page and go back (it will reload the compared games)
  SET_COMPARED_FRIENDS(state, friends) {
    state.comparedFriends = friends;
  },

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
  getComparedFriends(state) {
    return state.comparedFriends;
  },

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
