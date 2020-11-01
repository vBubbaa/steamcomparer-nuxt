<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Profile Found
        </div>
        <v-list-item-title class="headline mb-1">
          {{ user.personaname }}
        </v-list-item-title>
        <v-list-item-subtitle
          >View {{ user.personaname }}'s profile on
          SteamComparer.</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="user.avatarfull"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <LinkButton
        :to="'user/' + user.steamid"
        :text="'View Profile'"
        :icon="'mdi-account'"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import LinkButton from "../../components/LinkButton";

export default {
  name: "usersearchresult",
  components: {
    LinkButton
  },
  props: {
    user: Object
  }
};
</script>

<style scoped></style>
