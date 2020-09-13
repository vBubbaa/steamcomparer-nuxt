<template>
  <v-container>
    <v-sheet class="sheet" color="#333333">
      <v-row justify="center">
        <v-col class="text-center">
          <h1>
            About SteamComparer
            <v-icon size="50px">mdi-death-star-variant</v-icon>
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="header">How do we get our data?</div>
          <div class="answer">
            We get our data using a
            <a
              class="aboutlink"
              href="https://github.com/ValvePython/steam"
              target="_blank"
            >python port</a> of
            <a
              class="aboutlink"
              href="https://github.com/SteamRE/SteamKit"
              target="_blank"
            >Steamkit2</a> as well as Valve's official
            <a
              class="aboutlink"
              href="https://steamcommunity.com/dev"
              target="_blank"
            >WebAPI</a>.
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <div class="header">What tech stack is this site build on?</div>
          <div class="answer">
            For our backend, we use
            <a
              class="aboutlink"
              href="https://www.django-rest-framework.org/"
              target="_blank"
            >Django Rest Framework</a> and for our frontend we use
            <a
              class="aboutlink"
              href="https://nuxtjs.org/"
              target="_blank"
            >NuxtJS</a>.
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <div class="header">I've found a bug with your website!</div>
          <div class="answer">
            If you think that you have found a bug, please join our
            <a
              class="aboutlink"
              href="https://discord.gg/aHsqt6g"
              target="_blank"
            >discord</a> and message one of the admins. Thanks in advance!
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <div class="header">How do you monitor Steam for changes?</div>
          <div class="answer">
            Using the Python port of Steamkit, we have a cronjob that scans
            <a
              class="aboutlink"
              href="https://steam.readthedocs.io/en/latest/api/steam.client.html#steam.client.SteamClient.get_changes_since"
              target="_blank"
            >PICSChangesSince</a>. We then take the appid which was included in the change and work some magic to compare the game with our copy in the database.
            If anything has been changed, we change it and add a changelog. If the app doesn't exist in our database we add it. We get this app info from
            <a
              class="aboutlink"
              href="https://steam.readthedocs.io/en/latest/api/steam.client.html#steam.client.SteamClient.get_product_info"
              target="_blank"
            >get_product_info()</a> as well as the Steam WebAPI.
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <div class="header">What information do you store when I login?</div>
          <div class="answer">
            Our login uses
            <a
              class="aboutlink"
              href="https://steamcommunity.com/dev"
              target="_blank"
            >Steam OpenID</a> which is what Steam uses to let third party get public data such as your personaname and your avatar.
            We can't get any sensitive information such as your password. We only get public data, if your profile is set to public.
            We use GetPlayerSummaries, GetOwnedGames, and GetVacInfo from the Steam WebAPI.
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "about",
  head() {
    return {
      title: "About SteamComparer | FAQ",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Information about how SteamComparer tracks Steam data, and general FAQ questions such as bug reporting and privacy information.",
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  color: #e0e1dd;
}

.aboutlink {
  color: #ed254e !important;
  border-bottom: 1px solid transparent;
}

.aboutlink:hover {
  border-bottom: 1px solid #ed254e !important;
  font-weight: normal !important;
}

.sheet {
  padding: 1rem;
  border-radius: 5px;
}

.header {
  border-left: 2px solid #ed254e;
  padding: 10px 1rem;
}

.answer {
  padding: 1rem 0;
}
</style>