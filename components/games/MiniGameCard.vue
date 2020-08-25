<template>
  <v-card color="#333333">
    <v-img :src="buildGameImg()" height="200px">
      <v-card-title :v-text="app.name"></v-card-title>
    </v-img>

    <v-card-actions>
      <div>{{ app.name }}</div>
      <v-spacer></v-spacer>

      <v-btn icon color="#e0e1dd">
        <v-icon color="#ed254e">mdi-gamepad-variant-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MiniGameCard",
  props: {
    app: Object,
  },
  methods: {
    buildGameImg() {
      return (
        "https://steamcdn-a.akamaihd.net/steam/apps/" +
        this.app.appid +
        "/header.jpg"
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
