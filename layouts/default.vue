<template>
  <v-app class="app-wrapper">
    <!-- Side bar -->
    <v-navigation-drawer v-model="drawer" fixed app temporary color="#333333">
      <v-list>
        <v-list-item>
          <nuxt-link to="/changelogs">Change Logs</nuxt-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <nuxt-link to="/genres">Genres</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/publishers">Publishers</nuxt-link>
        </v-list-item>
        <v-list-item>
          <nuxt-link to="/developers">Developers</nuxt-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <nuxt-link to="/blog">Blog</nuxt-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <nuxt-link to="/about">About</nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Main navbar -->
    <v-app-bar color="#333333" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="default-link">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-btn text>
        <nuxt-link to="/games">Games</nuxt-link>
      </v-btn>
    </v-app-bar>
    <!-- Main content -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer :absolute="fixed" app color="#333333">
      <v-container class="pa-0" fluid>
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            <!-- Contact links -->
            <a href="https://discord.gg/53axWUb" target="_blank">
              <v-btn class="mx-4" icon>
                <v-icon color="white" size="30px">mdi-discord</v-icon>
              </v-btn>
            </a>
            <a href="mailto:steamcomparer@gmail.com">
              <v-btn class="mx-4" icon>
                <v-icon color="white" size="30px">mdi-email</v-icon>
              </v-btn>
            </a>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <!-- By yours, truly. -->
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            A project by
            <a
              href="https://twitter.com/VBubbaa"
              target="_blank"
              class="custom-link"
            >vBubbaa</a>
            <v-icon color="#ed254e">mdi-heart</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: true,
      title: "Steam Comparer",
    };
  },
};
</script>

<style scoped>
.app-wrapper {
  background-color: #141414;
}
</style>

// Global styles
<style>
/* Default anchor styles */
a {
  color: #e0e1dd !important;
  text-decoration: none !important;
}

a:hover {
  font-weight: bolder;
}

/* Active links red + bold */
.nuxt-link-active {
  color: #ed254e !important;
  font-weight: bold !important;
}

/* Non-red links */
.default-link {
  color: #e0e1dd !important;
  text-decoration: none !important;
}

/* Outside links = just red */
.custom-link {
  color: #ed254e !important;
}
</style>
  
</style>
