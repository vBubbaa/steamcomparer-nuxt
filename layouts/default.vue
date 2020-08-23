<template>
  <v-app class="app-wrapper">
    <v-navigation-drawer v-model="drawer" fixed app temporary color="#333333"></v-navigation-drawer>
    <!-- Main navbar -->
    <v-app-bar color="transparent" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/" class="default-link">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-btn text>
        <nuxt-link to="/games">Games</nuxt-link>
      </v-btn>
      <v-btn text>
        <nuxt-link to="/about">About</nuxt-link>
      </v-btn>
    </v-app-bar>
    <!-- Main content -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app color="#333333">
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
a {
  color: #e0e1dd !important;
  text-decoration: none !important;
}

.nuxt-link-active {
  color: #ed254e !important;
  font-weight: bold !important;
}

.default-link {
  color: #e0e1dd !important;
  text-decoration: none !important;
}
</style>
  
</style>
