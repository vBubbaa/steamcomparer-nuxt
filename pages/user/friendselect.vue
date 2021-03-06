<template>
  <v-container>
    <v-row justify="center" v-if="selectedFriends.length > 0">
      <v-col cols="12" class="text-center">Currently selected friends</v-col>
      <v-divider></v-divider>
      <v-col v-for="f in selectedFriends" :key="f.steamid">
        <div>
          <v-avatar>
            <img :src="f.avatar" :alt="f.personaname + ' avatar'" />
          </v-avatar>
        </div>
        <div>{{ f.personaname }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        class="text-center"
      >Select the friends you wish to compare game libraries with.</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Search Friends List" color="#ed254e" v-model="search"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <nuxt-link :to="{ name: 'user-compare', params: { selectedFriends } }">
          <v-btn width="100%" color="#ed254e" outlined tile @click="handleSubmit()">Compare</v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="friend in filterFriends"
        :key="friend.player[0].steamid"
        cols="12"
        md="6"
        lg="4"
        xl="4"
      >
        <UserListItem
          :user="friend.player[0]"
          @selectFriend="handleSelect"
          :selectedList="selectedFriends"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserListItem from "../../components/user/UserListItem"

export default {
  name: "friendselect",
  components: {
    UserListItem,
  },
  data() {
    return {
      selectedFriends: [this.$store.state.user],
      friends: [],
      filteredFriends: [],
      activeC: "isSelected",
      notActive: "notSelected",
      search: "",
    };
  },

  methods: {
    handleSelect(payload) {
      let exists = this.selectedFriends.includes(payload);
      if (exists) {
        let index = this.selectedFriends.findIndex(
          (u) => u.steamid === payload.steamid
        );
        this.selectedFriends.splice(index, 1);
      } else {
        this.selectedFriends.push(payload);
      }
    },

    handleSubmit() {
      // Save compared friends in vuex state so we can refresh compare page on page back
      this.$store.commit("SET_COMPARED_FRIENDS", this.selectedFriends);
    },
  },

  mounted() {
    //  If we have already fetched the users friends list, dont refetch the data
    if (this.$store.state.friendList.length > 0) {
      this.friends = this.$store.state.friendList;
      //  If we don't have a friends list, then fetch the data
    } else {
      this.$store
        .dispatch("fetchFriendList", this.$store.state.user.steamid)
        .then(() => {
          this.friends = this.$store.state.friendList;
        });
    }
  },

  head() {
    return {
      title: `SteamComparer | Friend Select`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Select the friends in which you want to compare steam app libraries with.",
        },
      ],
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },

    filterFriends() {
      return this.friends.filter((friend) => {
        return friend.player[0].personaname
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
</style>