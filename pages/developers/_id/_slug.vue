<template>
  <v-container v-if="apps.length != 0">
    <v-row justify="center" class="text-center">
      <v-col cols="12">
        <v-icon color="#ed254e">mdi-tag</v-icon>
        {{ this.$route.params.slug}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GameTable :apps="apps.data" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-pagination
          color="#ed254e"
          v-model="apps.pagination.current_page"
          :length="apps.pagination.num_pages"
          :total-visible="8"
          @input="nextPage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameTable from "../../../components/games/GameTable";

export default {
  name: "DeveloperDetail",
  components: {
    GameTable,
  },

  data() {
    return {
      apps: [],
      payload: {
        page: "",
        search: "",
      },
    };
  },

  head() {
    return {
      title: "Steamcomparer | ",
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

  methods: {
    nextPage(page) {
      this.payload.page = page;
      this.$fetch();
    },
    setSearchQuery: function () {
      this.payload.page = 1;
      this.$fetch();
    },
    slugify(desc) {
      return slug(desc);
    },
  },

  async fetch() {
    if (this.payload.page == "") {
      this.apps = await this.$axios.$get(
        "/api/gamesbydeveloper/" + this.$route.params.id,
        {
          params: { page: 1, search: this.payload.search },
        }
      );
    } else {
      this.apps = await this.$axios.$get(
        "/api/gamesbydeveloper/" + this.$route.params.id,
        {
          params: this.payload,
        }
      );
    }
  },
};
</script>

<style lang="scss" scoped>
</style>