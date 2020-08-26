<template>
  <div>{{ app.name }}</div>
</template>

<script>
export default {
  name: "GameDetail",
  head() {
    return {
      title: "game title",
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

  async asyncData({ $axios, params }) {
    // Get app data
    const app = await $axios.$get("/api/games/" + params.id);

    return {
      app: app,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>