<template>
  <v-container>
    <v-row justify="center">
      <!-- Header image -->
      <v-col cols="12" sm="6">
        <v-img
          height="100%"
          class="game-image"
          :src="'https://steamcdn-a.akamaihd.net/steam/apps/' + app.appid + '/header.jpg'"
        ></v-img>
      </v-col>
      <!-- Meta info: name, appid, current price, metacritic score, review %, review score -->
      <v-col cols="12" sm="6">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{{ app.name }}</td>
              </tr>
              <tr>
                <td>AppID</td>
                <td>{{ app.appid }}</td>
              </tr>
              <tr v-if="app.current_price">
                <td>Current Price</td>
                <td>$&nbsp;{{ app.current_price.price }}</td>
              </tr>
              <tr v-else>
                <td>Current Price</td>
                <td>Not Available</td>
              </tr>
              <tr v-if="app.metacritic_score">
                <td>Metacritic Score</td>
                <td>
                  <a class="game-link" :href="app.metacritic_fullurl">{{ app.metacritic_score }}</a>&nbsp;%
                </td>
              </tr>
              <tr v-else>
                <td>Metacritic Score</td>
                <td>Not Available</td>
              </tr>
              <tr v-if="app.review_percentage">
                <td>Review Percentage</td>
                <td>{{ app.review_percentage}}&nbsp;%</td>
              </tr>
              <tr v-else>
                <td>Review Percentage</td>
                <td>Not Available</td>
              </tr>
              <tr v-if="app.review_score">
                <td>Review Score</td>
                <td>{{ app.review_score}}</td>
              </tr>
              <tr v-else>
                <td>Review Score</td>
                <td>Not Available</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <!-- Chips for additonal meta info:  -->
    <v-row justify="center" class="text-center">
      <!-- Release state -->
      <v-col v-if="app.release_state == 'released'">
        <v-chip class="ma-2" color="#333333">
          <v-icon color="#64e384" left>mdi-check</v-icon>Full Release
        </v-chip>
      </v-col>
      <v-col v-if="app.controller_support == 'full'">
        <v-chip class="ma-2" color="#333333">
          <v-icon color="#64e384" left>mdi-check</v-icon>Full Controller Support
        </v-chip>
      </v-col>
      <v-col v-if="app.community_visible_stats == true">
        <v-chip class="ma-2" color="#333333">
          <v-icon color="#64e384" left>mdi-check</v-icon>Visible Community Stats
        </v-chip>
      </v-col>
      <v-col v-if="app.workshop_visible == true">
        <v-chip class="ma-2" color="#333333">
          <v-icon color="#64e384" left>mdi-check</v-icon>Visible Workshop
        </v-chip>
      </v-col>
      <v-col v-if="app.community_hub_visible == true">
        <v-chip class="ma-2" color="#333333">
          <v-icon color="#64e384" left>mdi-check</v-icon>Visible Community Hub
        </v-chip>
      </v-col>
    </v-row>

    <!-- Information tabs -->
    <v-card>
      <v-tabs background-color="#333333" center-active color="#ed254e" show-arrows fixed-tabs>
        <v-tab>Information</v-tab>
        <v-tab>Price History</v-tab>
        <v-tab>Change History</v-tab>
        <v-tab>Tags</v-tab>
        <v-tab>Steamspy Data</v-tab>

        <!-- Information Content -->
        <v-tab-item>
          <v-card flat>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-if="app.primary_genre">
                    <td>Priamry Genre</td>
                    <td>
                      <nuxt-link
                        class="game-link"
                        :to="{ name: 'genres-id-slug', params: { id: app.primary_genre.id, slug: slugify(app.primary_genre.genre_description) } }"
                      >{{ app.primary_genre.genre_description }}</nuxt-link>
                    </td>
                  </tr>
                  <tr v-if="app.steam_release_date">
                    <td>Steam Release Date</td>
                    <td>{{ app.steam_release_date }}</td>
                  </tr>
                  <tr v-if="app.app_type">
                    <td>App Type</td>
                    <td>{{ app.app_type.app_type }}</td>
                  </tr>
                  <tr v-if="app.os.length > 0">
                    <td>Supported OS</td>
                    <td>
                      <div v-for="os in app.os" :key="os.os" class="os-wrapper">
                        <v-icon v-if="os.os == 'WIN'">mdi-microsoft-windows</v-icon>
                        <v-icon v-else-if="os.os == 'MAC'">mdi-apple</v-icon>
                        <v-icon v-else>mdi-linux</v-icon>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="app.release_state">
                    <td>Release State</td>
                    <td>{{ app.release_state }}</td>
                  </tr>
                  <tr v-if="app.controller_support">
                    <td>Controller Support</td>
                    <td>{{ app.controller_support }}</td>
                  </tr>
                  <tr v-if="app.icon">
                    <td>Icon</td>
                    <td>
                      <a
                        target="_blank"
                        class="game-link"
                        :href="iconBuilder(app.icon, '.jpg')"
                      >{{ app.icon }}</a> (.jpg)
                    </td>
                  </tr>
                  <tr v-if="app.logo">
                    <td>Logo</td>
                    <td>
                      <a
                        target="_blank"
                        class="game-link"
                        :href="iconBuilder(app.logo, '.jpg')"
                      >{{ app.logo }}</a> (.jpg)
                    </td>
                  </tr>
                  <tr v-if="app.logo_small">
                    <td>Small Logo</td>
                    <td>
                      <a
                        target="_blank"
                        class="game-link"
                        :href="iconBuilder(app.logo_small, '.jpg')"
                      >{{ app.logo_small }}</a> (.jpg)
                    </td>
                  </tr>
                  <tr v-if="app.clienticon">
                    <td>Client Icon</td>
                    <td>
                      <a
                        target="_blank"
                        class="game-link"
                        :href="iconBuilder(app.clienticon, '.ico')"
                      >{{ app.clienticon }}</a> (.ico)
                    </td>
                  </tr>
                  <tr v-if="app.developer.length > 0">
                    <td>Developers</td>
                    <td>
                      <div v-for="dev in app.developer" :key="dev.id">
                        <nuxt-link
                          class="game-link"
                          :to="{ name: 'developers-id-slug', params: { id: dev.id, slug: slugify(dev.developer)}}"
                        >{{ dev.developer}}</nuxt-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="app.publisher.length > 0">
                    <td>Publishers</td>
                    <td>
                      <div v-for="pub in app.publisher" :key="pub.id">
                        <nuxt-link
                          class="game-link"
                          :to="{ name: 'publishers-id-slug', params: { id: pub.id, slug: slugify(pub.publisher)}}"
                        >{{ pub.publisher}}</nuxt-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="app.community_visible_stats">
                    <td>Visible Community Stats</td>
                    <td>{{ app.community_visible_stats }}</td>
                  </tr>
                  <tr v-if="app.workshop_visible">
                    <td>Visible Workshop</td>
                    <td>{{ app.workshop_visible }}</td>
                  </tr>
                  <tr v-if="app.community_hub_visible">
                    <td>Visible Community Hub</td>
                    <td>{{ app.community_hub_visible }}</td>
                  </tr>
                  <tr v-if="app.supported_languages.length > 0">
                    <td>Supported Languages</td>
                    <td>
                      <div
                        v-for="lang in app.supported_languages"
                        :key="lang.id"
                      >{{ lang.language }}</div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-tab-item>

        <!-- Price History -->
        <v-tab-item>
          <v-card flat>
            <v-card-text
              v-if="app.prices.length < 2"
              class="text-center"
            >No price history is available for this app.</v-card-text>
            <v-card-text v-else>
              <v-sheet color="#333333">
                <v-sparkline
                  :value="value"
                  color="#e0e1dd"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">${{ item.value }}</template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Change History -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <ChangeLogs :logs="logs" />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Tags -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-if="app.genres.length > 0">
                      <td>Genres</td>
                      <td>
                        <div v-for="g in app.genres" :key="g.id">
                          <nuxt-link
                            class="game-link"
                            :to="{ name: 'genres-id-slug', params: { id: g.id, slug: slugify(g.genre_description)}}"
                          >{{ g.genre_description }}</nuxt-link>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="app.categories.length > 0">
                      <td>Categories</td>
                      <td>
                        <div v-for="c in app.categories" :key="c.id">{{ c.category_description}}</div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Steamspy Stats -->
        <v-tab-item v-if="steamspyData">
          <v-card flat>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-if="steamspyData.owners">
                      <td>App Owners</td>
                      <td>
                        <div>{{ steamspyData.owners }}</div>
                      </td>
                    </tr>
                    <tr v-if="steamspyData.ccu">
                      <td>Peak Concurrent Users Yesterday</td>
                      <td>
                        <div>{{ steamspyData.ccu }}</div>
                      </td>
                    </tr>
                    <tr v-if="steamspyData.average_forever">
                      <td>Average Playtime Forever (hours)</td>
                      <td>
                        <div>{{ toHours(steamspyData.average_forever) }}</div>
                      </td>
                    </tr>
                    <tr v-if="steamspyData.average_2weeks">
                      <td>Average Playtime 2 Weeks (hours)</td>
                      <td>
                        <div>{{ toHours(steamspyData.average_2weeks) }}</div>
                      </td>
                    </tr>

                    <tr v-if="steamspyData.median_forever">
                      <td>Median Playtime Since 2009 (hours)</td>
                      <td>
                        <div>{{ toHours(steamspyData.median_forever) }}</div>
                      </td>
                    </tr>
                    <tr v-if="steamspyData.median_2weeks">
                      <td>Median Playtime 2 weeks (hours)</td>
                      <td>
                        <div>{{ toHours(steamspyData.median_2weeks) }}</div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import ChangeLogs from "../../../components/games/ChangeLogs";
import slug from "slug";

export default {
  name: "GameDetail",
  components: {
    ChangeLogs,
  },
  data: () => ({
    // Holds price values used by sparkline
    value: [],
  }),
  head() {
    return {
      title: `Steamcomparer | ${this.app.name}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `View detailed information about ${this.app.name}, including price information, change history, game support, and more.`,
        },
      ],
    };
  },

  mounted() {
    // Push prices into value[] to be used by sparkline
    for (var key in this.app.prices) {
      this.value.push(parseFloat(this.app.prices[key]["price"]));
    }
  },

  methods: {
    // Builds game icon links with icon value, and the ending extension (.jpeg, .ico, etc.)
    iconBuilder(val, extension) {
      return (
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/" +
        this.app.appid +
        "/" +
        val +
        extension
      );
    },

    slugify(desc) {
      return slug(desc);
    },

    toHours(number) {
      return (number / 60).toFixed(2);
    },
  },

  async asyncData({ $axios, params, error }) {
    // Get app data
    const app = await $axios.$get("/api/games/" + params.id);
    const logs = await $axios.$get("/api/gamelogs/" + params.id + "/");
    const steamspyData = await $axios
      .$get("/api/steamspy/" + params.id + "/")
      .catch((err) => {
        error({
          statusCode: 404,
          message: "Game not found.",
        });
      });

    return {
      app: app,
      logs: logs,
      steamspyData: steamspyData,
    };
  },
};
</script>

<style scoped>
.header-img {
  width: 100%;
  height: 100%;
}

.game-image {
  border-radius: 5px;
}

.game-link {
  color: #ed254e !important;
  font-weight: normal;
}

.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #333333;
}

.tab-active {
  color: #ed254e !important;
}

.os-wrapper {
  display: inline-block;
}

.theme--dark.v-chip:not(.v-chip--active) {
  background-color: #333333 !important;
  background: #333333 !important;
}
</style>