<template>
  <v-container>
    <v-alert dense dismissible type="error" v-if="errorCatch">
      An error has occured fetching your game library. Try again in a few
      seconds.
    </v-alert>
    <v-card color="#333333" class="pa-3">
      <v-row justify="center" class="text-center">
        <v-col cols="12">
          <v-avatar size="100">
            <img
              class="user-picture"
              :src="userdata.userdetails.response.players.player[0].avatarfull"
              alt="John"
            />
          </v-avatar>
          <div class="d-flex justify-center align-center">
            <span class="plain-text user--name">{{
              userdata.userdetails.response.players.player[0].personaname
            }}</span>
            <country-flag
              :country="
                userdata.userdetails.response.players.player[0].loccountrycode
              "
              size="normal"
            />
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="6">
          <v-simple-table class="table-wrapper">
            <template v-slot:default>
              <thead>
                <tr>
                  <td>User Data</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SteamID</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0].steamid
                    "
                  >
                    {{
                      userdata.userdetails.response.players.player[0].steamid
                    }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Last Logoff</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0].lastlogoff
                    "
                  >
                    {{
                      epochToDate(
                        userdata.userdetails.response.players.player[0]
                          .lastlogoff
                      )
                    }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Account Created</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0]
                        .timecreated
                    "
                  >
                    {{
                      epochToDate(
                        userdata.userdetails.response.players.player[0]
                          .timecreated
                      )
                    }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Profile URL</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0].profileurl
                    "
                    class="overflow"
                  >
                    <a
                      :href="
                        userdata.userdetails.response.players.player[0]
                          .profileurl
                      "
                      target="_blank"
                      class="td-link"
                    >
                      {{
                        userdata.userdetails.response.players.player[0]
                          .profileurl
                      }}
                    </a>
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Avatar</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0].avatar
                    "
                    class="overflow"
                  >
                    <a
                      :href="
                        userdata.userdetails.response.players.player[0].avatar
                      "
                      target="_blank"
                      class="td-link"
                    >
                      {{
                        userdata.userdetails.response.players.player[0].avatar
                      }}
                    </a>
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Avatar Medium</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0]
                        .avatarmedium
                    "
                    class="overflow"
                  >
                    <a
                      :href="
                        userdata.userdetails.response.players.player[0]
                          .avatarmedium
                      "
                      class="td-link"
                      target="_blank"
                    >
                      {{
                        userdata.userdetails.response.players.player[0]
                          .avatarmedium
                      }}
                    </a>
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Avatar Full</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0].avatarfull
                    "
                    class="overflow"
                  >
                    <a
                      :href="
                        userdata.userdetails.response.players.player[0]
                          .avatarfull
                      "
                      class="td-link"
                      target="_blank"
                    >
                      {{
                        userdata.userdetails.response.players.player[0]
                          .avatarfull
                      }}
                    </a>
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Avatar Hash</td>
                  <td
                    v-if="
                      userdata.userdetails.response.players.player[0].avatarhash
                    "
                    class="overflow"
                  >
                    {{
                      userdata.userdetails.response.players.player[0].avatarhash
                    }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12" sm="6">
          <v-simple-table class="table-wrapper">
            <template v-slot:default>
              <thead>
                <tr>
                  <td>Vac Data</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Community Banned</td>
                  <td
                    v-if="userdata.vacinfo.players[0].CommunityBanned != null"
                  >
                    {{ userdata.vacinfo.players[0].CommunityBanned }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>VAC Banned</td>
                  <td v-if="userdata.vacinfo.players[0].VACBanned != null">
                    {{ userdata.vacinfo.players[0].VACBanned }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Economy Banned</td>
                  <td v-if="userdata.vacinfo.players[0].EconomyBan != null">
                    {{ userdata.vacinfo.players[0].EconomyBan }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td># VAC Bans</td>
                  <td
                    v-if="userdata.vacinfo.players[0].NumberOfVACBans != null"
                  >
                    {{ userdata.vacinfo.players[0].NumberOfVACBans }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td>Days Since Last Ban</td>
                  <td
                    v-if="userdata.vacinfo.players[0].DaysSinceLastBan != null"
                  >
                    {{ userdata.vacinfo.players[0].DaysSinceLastBan }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
                <tr>
                  <td># Of Game Bans</td>
                  <td
                    v-if="userdata.vacinfo.players[0].NumberOfGameBans != null"
                  >
                    {{ userdata.vacinfo.players[0].NumberOfGameBans }}
                  </td>
                  <td v-else>N/A</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="games == null">
        <v-col cols="12">
          <v-btn
            width="100%"
            color="#ed254e"
            :disabled="timeout"
            @click="loadGames()"
            >Load User Games</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center">User Library</v-col>
        <v-col cols="6" class="text-center"
          >Library Cost: <span class="green-text">${{ libcost }}</span></v-col
        >
        <v-col cols="6" class="text-center"
          >Excluded Apps (Not in DB):
          <span class="red-text">{{ appsNotInDB }}</span></v-col
        >
        <v-col cols="12" v-if="$vuetify.breakpoint.mobile">
          <v-data-table
            :headers="mobileHeaders"
            :items="games"
            :items-per-page="10"
            class="elevation-1"
          >
          </v-data-table>
        </v-col>
        <v-col cols="12" v-else>
          <v-data-table
            :headers="headers"
            :items="games"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:item.image="{ item }">
              <v-img
                :src="item.image"
                :alt="item.name"
                height="150"
                contain
              ></v-img>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import CountryFlag from "vue-country-flag";
import slug from "slug";
import MiniGameCard from "../../components/games/MiniGameCard";

export default {
  name: "profiledetail",
  components: {
    CountryFlag,
    MiniGameCard
  },
  head() {
    return {
      title: `Steam User - ${this.userdata.userdetails.response.players.player[0].personaname}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Steam profile overview for ${this.userdata.userdetails.response.players.player[0].personaname}, including Vac Ban information and the user's game library.`
        }
      ]
    };
  },

  data() {
    return {
      games: null,
      libCost: null,
      appsNotInDB: null,
      timeout: false,
      errorCatch: false,
      headers: [
        {
          text: "App",
          value: "image",
          sortable: false
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: "App ID",
          value: "appid"
        },
        {
          text: "Total Playtime",
          value: "total_playtime"
        },
        {
          text: "Current Price",
          value: "current_price"
        }
      ],
      mobileHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: "App ID",
          value: "appid"
        },
        {
          text: "Total Playtime",
          value: "total_playtime"
        },
        {
          text: "Current Price",
          value: "current_price"
        }
      ]
    };
  },

  // Get the number of apps in our database
  async asyncData({ $axios, params }) {
    // Get the user data of given appid in url param
    const userdata = await $axios.$get(`/api/user/useroverview/${params.id}/`);

    return {
      userdata: userdata
    };
  },

  methods: {
    epochToDate(d) {
      let date = new Date(d * 1000);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },

    slugify(name) {
      return slug(name);
    },

    async loadGames() {
      try {
        let res = await this.$axios.$get(
          `/api/user/useroverview/${this.$route.params.id}/games/`
        );
        console.log(res);
        this.games = res.games;
        this.libcost = res.libcost;
        this.appsNotInDB = res.appsNotInDB;
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

<style scoped>
.green-text {
  color: #32a852;
}

.red-text {
  color: #ed254e;
}

.td-link {
  color: #ed254e !important;
}

.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #333333;
}

.user-picture {
  border: 3px solid #141414 !important;
}

.plain-text {
  color: #e0e1dd;
}

.user--name {
  font-size: 1.2rem;
}

.name--country {
  display: flex;
  align-self: center;
  justify-content: center;
}

.theme--dark.v-data-table {
  background-color: transparent;
  border: 1px solid #e0e1dd;
}

.table-wrapper {
  color: #e0e1dd !important;
}

.overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 1px;
}
</style>
