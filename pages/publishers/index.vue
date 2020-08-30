<template>
  <div>
    <v-container v-if="publishers.length != 0">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="payload.search" @input="setSearchQuery()" color="#e0e1dd">
            <template v-slot:label>
              Search for publishers
              <v-icon style="vertical-align: middle">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-simple-table class="table-wrapper">
            <template v-slot:default>
              <thead class="table-header-color">
                <tr>
                  <th class="text-left">Publisher</th>
                  <th class="text-left">App Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in publishers.data" :key="p.id">
                  <td>
                    <nuxt-link
                      class="log-link"
                      :to="
                        '/publishers/' + p.id + '/' + slugify(p.publisher)
                      "
                    >{{ p.publisher }}</nuxt-link>
                  </td>
                  <td>{{ p.game_count }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-pagination
            color="#ed254e"
            v-model="publishers.pagination.current_page"
            :length="publishers.pagination.num_pages"
            :total-visible="8"
            @input="nextPage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import slug from "slug";

export default {
  name: "PublisherList",
  data() {
    return {
      publishers: [],
      payload: {
        page: "",
        search: "",
      },
    };
  },
  head() {
    return {
      title: "Steamcomparer | Publishers",
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
      this.publishers = await this.$axios.$get("/api/publishers/", {
        params: { page: 1, search: this.payload.search },
      });
    } else {
      this.publishers = await this.$axios.$get("/api/publishers/", {
        params: this.payload,
      });
    }
  },
};
</script>

<style scoped>
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #333333;
}

.table-wrapper {
  color: #e0e1dd !important;
}

.table-header-color {
  background-color: #333333 !important;
}

.log-link {
  color: #ed254e !important;
}
</style>
