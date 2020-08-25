<template>
  <div>
    <!-- Parallax header with app + log count -->
    <v-parallax class="header-img" :src="require('@/assets/scheader-7.png')">
      <v-container>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="white-text">Compare. Share. Track.</h1>
            <hr class="hr-divider" />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12" sm="6">
            <div>
              <span class="data-number">{{ appscount }}</span>
              <br />
              <h2 class="white-text">apps in our database.</h2>
              <br />
              <LinkButton text="Browse Apps" to="games" icon="mdi-nintendo-game-boy" />
            </div>
          </v-col>
          <v-col class="text-center" cols="12" sm="6">
            <div>
              <span class="data-number">{{ logscount }}</span>
              <br />
              <h2 class="white-text">apps updated today.</h2>
              <br />
              <LinkButton text="Browse Changelogs" to="changelogs" icon="mdi-note-outline" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <!-- Recent Apps -->
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center recent-header">Recent Apps Added</v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" v-for="app in apps" :key="app.id">
          <MiniGameCard :app="app" />
        </v-col>
      </v-row>

      <!-- Recent change logs -->

      <v-row>
        <v-col cols="12" class="text-center recent-header">Recent Change Logs</v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ChangeLogs :logs="logs" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LinkButton from "../components/LinkButton";
import MiniGameCard from "../components/games/MiniGameCard";
import ChangeLogs from "../components/games/ChangeLogs";

export default {
  components: {
    LinkButton,
    MiniGameCard,
    ChangeLogs,
  },
  head() {
    return {
      title:
        "Steamcomparer | Compare steam game libraries and view detailed steam information.",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Steamcomparer allows you to compare your steam libraries with friends. It tracks Steam app changes as soon as they happen on steam and records a history of steam changes.",
        },
      ],
    };
  },
  // Get the number of apps in our database
  async asyncData({ $axios }) {
    // Get total # of apps in our database
    const appcount = await $axios.$get("/api/appcount/");
    // Get total # of logs created today
    const logcount = await $axios.$get("/api/logstoday/");
    // Get 9 most recent games
    const apps = await $axios.$get("/api/recentgames/");
    // Get 10 most recent changelogs
    const logs = await $axios.$get("/api/logs/");

    return {
      appscount: appcount.appcount,
      logscount: logcount.logcount,
      apps: apps,
      logs: logs,
    };
  },
};
</script>

<style scoped>
.header-img {
  width: 100%;
  height: 100%;
}

.text-section {
  background-color: black;
  opacity: 0.5;
}

.hr-divider {
  text-align: center;
  border-top: 8px solid #e0e1dd;
  width: 250px;
  margin: auto;
  border-radius: 10px;
}

.data-number {
  color: #ed254e;
  font-size: 40px;
  font-weight: bold;
}

.browsable-btn {
  color: #ed254e !important;
}

.recent-header {
  color: #e0e1dd;
  font-weight: bold;
  font-size: 24px;
}

.white-text {
  color: #e0e1dd;
}
</style>
