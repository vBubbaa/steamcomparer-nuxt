<template>
  <div>
    <v-parallax class="header-img" :src="require('@/assets/scheader-7.png')">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1>Compare. Share. Track.</h1>
          <hr class="hr-divider" />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" sm="6">
          <div>
            <span class="data-number">{{ apps }}</span>
            <br />
            <h2>apps in our database.</h2>
            <br />
            <LinkButton
              text="Browse Apps"
              to="games"
              icon="mdi-nintendo-game-boy"
            />
          </div>
        </v-col>
        <v-col class="text-center" cols="12" sm="6">
          <div>
            <span class="data-number">{{ logs }}</span>
            <br />
            <h2>apps updated today.</h2>
            <br />
            <LinkButton
              text="Browse Changelogs"
              to="changelogs"
              icon="mdi-note-outline"
            />
          </div>
        </v-col>
      </v-row>
    </v-parallax>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
  </div>
</template>

<script>
import LinkButton from "../components/LinkButton";
export default {
  components: {
    LinkButton
  },
  data() {
    return {
      apps: {}
    };
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
            "Steamcomparer allows you to compare your steam libraries with friends. It tracks Steam app changes as soon as they happen on steam and records a history of steam changes."
        }
      ]
    };
  },
  // Get the number of apps in our database
  async asyncData({ $axios }) {
    // Get total # of apps in our database
    const apps = await $axios.$get("/api/appcount/");
    // Get total # of logs created today
    const logs = await $axios.$get("/api/logstoday/");

    return { apps: apps.appcount, logs: logs.logcount };
  }
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
</style>
