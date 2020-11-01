<template>
  <div class="container">
    <v-row>
      <v-col>
        <v-alert dense dismissible type="error" v-if="errorCatch">
          An error has occured searching for that user. Make sure that you have
          the correct URL and try again in a few seconds.
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        ><v-text-field
          outlined
          color="#ed254e"
          label="Search for users"
          v-model="url"
          @keyup.enter="searchUser"
          :disabled="timeout"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col v-if="fetchedUser">
        <UserSearchResult :user="fetchedUser" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Find a SteamID through the Steam Website</v-card-title>
          <v-card-text>
            <ul>
              <li>
                Navigate to the profile that you are trying to find on
                <a href="https://store.steampowered.com">steam</a>.
              </li>
              <li>
                <div>
                  Copy and paste the URL of the user profile into the searchbar
                  above
                </div>
                <div>
                  It shoud look something like the following:
                  <div>
                    <pre>
https://steamcommunity.com/profiles/NUMBER-NEEDED-HERE/</pre
                    >
                  </div>

                  <div>
                    <pre>https://steamcommunity.com/id/SOME-USERNAME-HERE/</pre>
                  </div>
                </div>
              </li>
              <li>
                Click enter to get search results
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserSearchResult from "../../components/user/UserSearchResult";

export default {
  name: "friendview",
  data() {
    return {
      url: null,
      fetchedUser: null,
      timeout: false,
      errorCatch: false
    };
  },
  components: {
    UserSearchResult
  },
  head() {
    return {
      title: "Search for Steam users",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Enter the steam URL of the profile you want to find and view detailed account statistics."
        }
      ]
    };
  },
  methods: {
    async searchUser() {
      try {
        let res = await this.$axios.$get(`/api/user/usersearch/`, {
          params: { url: this.url }
        });
        this.fetchedUser = res.userdetails.response.players.player[0];
        this.errorCatch = false;
      } catch (error) {
        this.errorCatch = true;
        this.timeout = true;
        setTimeout(() => (this.timeout = false), 10000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #ed254e !important;
}

pre {
  background: #333333;
  width: fit-content;
  padding: 5px;
}
</style>
