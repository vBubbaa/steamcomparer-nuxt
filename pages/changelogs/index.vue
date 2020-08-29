<template>
  <div>
    <v-container v-if="logs.length != 0">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="payload.search" @input="setSearchQuery()" color="#e0e1dd">
            <template v-slot:label>
              Search for change logs
              <v-icon style="vertical-align: middle">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <ChangeLogs :logs="logs.data" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-pagination
            color="#ed254e"
            v-model="logs.pagination.current_page"
            :length="logs.pagination.num_pages"
            :total-visible="8"
            @input="nextPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChangeLogs from "../../components/games/ChangeLogs";
import mapState from "vuex";

export default {
  name: "ChangeLogsListView",
  components: {
    ChangeLogs,
  },
  data() {
    return {
      logs: [],
      loading: false,
      payload: {
        page: "",
        search: "",
      },
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
  },

  async fetch() {
    console.log(this.$fetchState);
    if (this.payload.page == "") {
      this.logs = await this.$axios.$get("/api/alllogs/", {
        params: { page: 1, search: this.payload.search },
      });
    } else {
      this.logs = await this.$axios.$get("/api/alllogs/", {
        params: this.payload,
      });
    }
  },
};
</script>

<style scoped>
</style>