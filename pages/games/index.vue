<template>
  <div>
    <v-container v-if="games.length != 0">
      <!-- Search Bar -->
      <v-row>
        <v-col cols="12">
          <v-text-field color="#1e2ede" v-model="payload.search" @input="setSearchQuery()">
            <template v-slot:label>
              Search for games
              <v-icon style="vertical-align: middle">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <!-- Advanced search turn on/off -->
      <v-row>
        <v-col>
          Advanced Search
          <v-btn text icon class="ma-2" color="indigo" @click="advancedSearch = !advancedSearch">
            <v-btn icon color="#e0e1dd" v-if="advancedSearch">
              <v-icon color="#ed254e">mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn icon color="#e0e1dd" v-else>
              <v-icon color="#ed254e">mdi-chevron-down</v-icon>
            </v-btn>
          </v-btn>
        </v-col>
      </v-row>
      <!-- Advanced Filters -->
      <div v-if="advancedSearch">
        <!-- Controller support / Full Release / Free -->
        <v-row>
          <v-col cols="12" sm="4">
            <v-checkbox
              v-model="payload.controllerSupport"
              label="Full Controller Support"
              color="#1e2ede"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="4">
            <v-checkbox v-model="payload.releaseState" label="Full release" color="#1e2ede"></v-checkbox>
          </v-col>
          <v-col cols="12" sm="4">
            <v-checkbox v-model="payload.isFree" label="Free" color="#1e2ede"></v-checkbox>
          </v-col>
        </v-row>
        <!-- OS Options / Languages select / AppType select -->
        <v-row justify="space-between">
          <v-col cols="12" sm="4">
            <v-select
              :items="osOptions"
              label="Operating System"
              v-model="payload.os"
              clearable
              color="#1e2ede"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              :items="langList"
              label="Language"
              color="#1e2ede"
              v-model="payload.langPayload"
              item-text="language"
              item-value="language"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              :items="appTypeList"
              label="App Type"
              color="#1e2ede"
              v-model="payload.appTypePayload"
              item-text="app_type"
              item-value="app_type"
              clearable
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <!-- Links to genres, developers, publishers -->
          <v-col cols="12" sm="4">
            <nuxt-link to="/genres">
              Browse Genres
              <v-icon color="#1e2ede">mdi-arrow-right-bold-circle-outline</v-icon>
            </nuxt-link>
          </v-col>
          <v-col cols="12" sm="4">
            <nuxt-link to="/developers">
              Browse Developers
              <v-icon color="#1e2ede">mdi-arrow-right-bold-circle-outline</v-icon>
            </nuxt-link>
          </v-col>
          <v-col cols="12" sm="4">
            <nuxt-link to="/publishers">
              Browse Publishers
              <v-icon color="#1e2ede">mdi-arrow-right-bold-circle-outline</v-icon>
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox v-model="payload.weebFilter" color="#1e2ede">
              <template slot="label">
                Weeb Filter&nbsp;
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" color="#ed254e">mdi-alert-octagon</v-icon>
                  </template>
                  <span>Excludes apps with the genre "Sexual Content"</span>
                </v-tooltip>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <!-- Submit filters / Clear filters -->
        <v-row justify="space-between">
          <v-col cols="6" class="flex-center">
            <v-btn class="ma-2" outlined color="#1e2ede" @click.prevent="setSearchQuery">
              Submit&nbsp;
              <v-icon>mdi-cube-send</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6" class="flex-center">
            <v-btn class="ma-2" outlined color="#ed254e" @click.prevent="clearFilters">
              Clear Filters&nbsp;
              <v-icon>mdi-nuke</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <!-- Games -->
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" v-for="app in games.data" :key="app.id">
          <MiniGameCard :app="app" />
        </v-col>
      </v-row>
      <!-- Pagination -->
      <v-row>
        <v-col cols="12">
          <v-pagination
            color="#ed254e"
            v-model="games.pagination.current_page"
            :length="games.pagination.num_pages"
            :total-visible="8"
            @input="nextPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MiniGameCard from "../../components/games/MiniGameCard";
export default {
  name: "gameslist",
  components: {
    MiniGameCard,
  },
  data() {
    return {
      advancedSearch: false,
      osOptions: ["Windows", "Mac", "Linux"],
      games: [],
      payload: {
        page: "",
        search: "",
        controllerSupport: "",
        releaseState: "",
        isFree: "",
        os: "",
        langPayload: "",
        appTypePayload: "",
        weebFilter: "",
      },
    };
  },
  head() {
    return {
      title: "Steamcomparer | Games",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Advanced searching for all apps in our large database of Steam games.",
        },
      ],
    };
  },
  methods: {
    nextPage(page) {
      this.payload.page = page;
      this.$fetch();
    },
    setSearchQuery: function () {
      this.payload.page = 1;
      this.$fetch();
    },
    clearFilters: function () {
      this.payload.search = "";
      this.payload.controllerSupport = "";
      this.payload.releaseState = "";
      this.payload.isFree = "";
      this.payload.os = "";
      this.payload.langPayload = "";
      this.payload.appTypePayload = "";
      this.payload.weebFilter = "";
      this.setSearchQuery();
    },
  },

  // Inital requests for language list & apptype list
  async asyncData({ $axios }) {
    // Get total # of apps in our database
    const langList = await $axios.$get("/api/languages/");
    // Get total # of logs created today
    const appTypeList = await $axios.$get("/api/apptypes/");

    return {
      langList: langList,
      appTypeList: appTypeList,
    };
  },

  async fetch() {
    if (this.payload.page == "") {
      this.games = await this.$axios.$get("/api/games/", {
        params: { page: 1, search: this.payload.search },
      });
    } else {
      this.games = await this.$axios.$get("/api/games/", {
        params: this.payload,
      });
    }
  },
};
</script>

<style scoped>
.flex-center {
  justify-content: center;
  display: flex;
}
</style>
