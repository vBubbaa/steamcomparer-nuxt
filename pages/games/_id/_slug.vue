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
        <v-chip class="ma-2" color="#e0e1dd" outlined>
          <v-icon color="#64e384" left>mdi-check</v-icon>Full Release
        </v-chip>
      </v-col>
      <v-col v-if="app.controller_support == 'full'">
        <v-chip class="ma-2" color="#e0e1dd" outlined>
          <v-icon color="#64e384" left>mdi-check</v-icon>Full Controller Support
        </v-chip>
      </v-col>
      <v-col v-if="app.community_visible_stats == true">
        <v-chip class="ma-2" color="#e0e1dd" outlined>
          <v-icon color="#64e384" left>mdi-check</v-icon>Community Visible Stats
        </v-chip>
      </v-col>
      <v-col v-if="app.workshop_visible == true">
        <v-chip class="ma-2" color="#e0e1dd" outlined>
          <v-icon color="#64e384" left>mdi-check</v-icon>Visible Workshop
        </v-chip>
      </v-col>
      <v-col v-if="app.community_hub_visible == true">
        <v-chip class="ma-2" color="#e0e1dd" outlined>
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

        <!-- Information Content -->
        <v-tab-item>
          <v-card flat>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-if="app.os.length > 0">
                    <td>Supported OS</td>
                    <td>
                      <div v-for="os in app.os" :key="os" class="os-wrapper">
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
                      <div v-for="dev in app.developer" :key="dev.id">{{ dev.developer}}</div>
                    </td>
                  </tr>
                  <tr v-if="app.publisher.length > 0">
                    <td>Publishers</td>
                    <td>
                      <div v-for="pub in app.publisher" :key="pub.id">{{ pub.publisher}}</div>
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
            <v-card-text>Price history</v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Change History -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>Change History</v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Tags -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>Tags</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "GameDetail",
  head() {
    return {
      title: this.app.name + " | Steamcomaprer",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Game desc.",
        },
      ],
    };
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
  },

  async asyncData({ $axios, params }) {
    // Get app data
    const app = await $axios.$get("/api/games/" + params.id);

    return {
      app: app,
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
</style>