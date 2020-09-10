<template>
  <v-container>
    <v-row v-if="sharedgames.privateFriends.length > 0">
      <v-col cols="12">
        <v-alert type="warning">
          The following users have private profiles and have not been included in the results:
          <span
            v-for="f in sharedgames.privateFriends"
            :key="f.personaname"
            class="bold"
          >{{ f }} &nbsp;</span>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="friend in $route.params.selectedFriends"
        :key="friend.steamid"
        class="text-center"
      >
        <nuxt-link :to="{ name: 'user-id', params: { id: friend.steamid }}">
          <v-badge :value="hover" :content="friend.personaname" top transition="slide-y-transition">
            <v-hover v-model="hover">
              <v-avatar size="70">
                <v-img :src="friend.avatarfull"></v-img>
              </v-avatar>
            </v-hover>
          </v-badge>
        </nuxt-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">Common Games</v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6" lg="4" xl="4" v-for="game in sharedgames.commonGames" :key="game.appid">
        <MiniGameCard :app="game" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniGameCard from "../../components/games/MiniGameCard";

export default {
  name: "compare",
  data() {
    return {
      hover: false,
    };
  },
  async asyncData({ $axios, params }) {
    // Build steamids arr for POST request
    let sids = [];
    params.selectedFriends.forEach((friend) => {
      sids.push(friend.steamid);
    });
    console.log(sids);
    // Get total # of apps in our database
    const sharedgames = await $axios.$get("/api/user/compare/", {
      params: sids,
    });
    return {
      sharedgames: sharedgames,
    };
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>