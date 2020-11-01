<template>
  <v-app class="app-wrapper">
    <!-- Side bar -->
    <v-navigation-drawer v-model="drawer" fixed app temporary color="#333333">
      <v-list>
        <v-list-item v-if="Object.entries(user).length">
          <nuxt-link :to="{ name: 'user-id', params: { id: user.steamid } }"
            >Profile Overview</nuxt-link
          >
        </v-list-item>
        <v-list-item v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-disabled" v-bind="attrs" v-on="on">
                Profile Overview
              </div>
            </template>
            <span>Must be logged in to compare libraries.</span>
          </v-tooltip>
        </v-list-item>
        <v-list-item class="hidden-md-and-up">
          <nuxt-link
            :to="{ name: 'user-friendselect' }"
            v-if="Object.entries(user).length"
            >Compare Libraries</nuxt-link
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <nuxt-link :to="{ name: 'user-usersearch' }">Search Users</nuxt-link>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-if="Object.entries(user).length"
          class="hidden-md-and-up"
        >
          <nuxt-link to="/games">Games</nuxt-link>
        </v-list-item>
        <v-divider class="hidden-md-and-up"></v-divider>
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
      <v-btn text class="hidden-sm-and-down">
        <nuxt-link to="/games">Games</nuxt-link>
      </v-btn>
      <v-btn text v-if="Object.entries(user).length" class="hidden-sm-and-down">
        <nuxt-link :to="{ name: 'user-friendselect' }"
          >Compare Libraries</nuxt-link
        >
      </v-btn>
      <v-tooltip bottom v-else>
        <template v-slot:activator="{ on, attrs }">
          <div class="disabled" v-bind="attrs" v-on="on">
            Compare Libraries
          </div>
        </template>
        <span>Must be logged in to compare libraries.</span>
      </v-tooltip>

      <!-- User not auth -->
      <v-btn text v-if="!Object.entries(user).length" v-bind="attrs" v-on="on">
        <a :href="loginLink()">login</a>
      </v-btn>

      <!-- User is auth -->
      <v-menu open-on-hover offset-y v-if="Object.entries(user).length">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <span class="overflow-protector">{{
              user.personaname
            }}</span></v-btn
          >
        </template>

        <v-list>
          <v-list-item>
            <div class="fake-link" @click="logout()">Logout</div>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- Main content -->
    <v-main>
      <div class="main-wrap">
        <nuxt />
      </div>
    </v-main>
    <!-- Footer -->
    <v-footer :absolute="fixed" app color="#333333">
      <v-container class="pa-0" fluid>
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            <!-- Contact links -->
            <a href="https://discord.gg/53axWUb" target="_blank">
              <v-btn class="mx-4" icon>
                <v-icon color="#ed254e" size="30px">mdi-discord</v-icon>
              </v-btn>
            </a>
            <a href="mailto:steamcomparer@gmail.com">
              <v-btn class="mx-4" icon>
                <v-icon color="#ed254e" size="30px">mdi-email</v-icon>
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
              >vBubbaa</a
            >
            <v-icon color="#ed254e">mdi-heart</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: ["on", "attrs"],
  data() {
    return {
      drawer: false,
      fixed: true,
      title: "Steam Comparer"
    };
  },

  methods: {
    // Grab the steam_data cookie with the user information returned from steam
    getCookieValue(cookieName) {
      var name = cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    // Commit store logout
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/");
    },

    loginLink() {
      if (process.env.NODE_ENV == "production") {
        return "https://steamcomparer.com/openid/steam/login/";
      } else {
        return "http://127.0.0.1:8000/openid/steam/login/";
      }
    }
  },

  // Check for auth cookie
  mounted() {
    // Format the cookie to correct JSON and parse it
    if (this.getCookieValue("steam_data") != "") {
      let user = this.getCookieValue("steam_data").replace(/\\054/g, ",");
      user = user
        .replace(/'/g, '"')
        .replace(/"{/g, "{")
        .replace(/}"/g, "}");
      user = JSON.parse(user);
      // Update the vuex state user to the new logged in user
      this.$store.commit("SET_USER", user);
    } else {
      console.log("no user");
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  background-color: #141414;
}

.main-wrap {
  width: 100%;
  height: 100%;
}

.disabled {
  color: gray !important;
  font-weight: bold;
  cursor: pointer;
  padding: 0 16px;
}

.nav-disabled {
  color: gray !important;
  font-weight: bold;
  cursor: pointer;
}

.overflow-protector {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 130px;
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

.fake-link {
  color: #e0e1dd !important;
  text-decoration: none !important;
  cursor: pointer;
}

.fake-link:hover {
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

.contact-icon {
  color: #ed254e !important;
}
</style>
