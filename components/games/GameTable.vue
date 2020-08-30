<template>
  <v-simple-table class="table-wrapper">
    <template v-slot:default>
      <thead class="table-header-color">
        <tr>
          <th class="text-left">App</th>
          <th class="text-left"></th>
          <th class="text-left">AppID</th>
          <th class="text-left">App Type</th>
          <th class="text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="app in apps" :key="app.id">
          <td>
            <v-img
              max-width="200px"
              :src="headerImgBuilder(app.appid)"
              :alt="'Header image for ' + app.name"
            />
          </td>
          <td>
            <nuxt-link
              :to="'/games/' + app.appid + '/' + app.slug + '/'"
              class="log-link"
            >{{ app.name }}</nuxt-link>
          </td>
          <td>{{ app.appid}}</td>
          <td v-if="app.app_type">{{ app.app_type.app_type}}</td>
          <td v-else>N/A</td>
          <td v-if="app.current_price">{{ app.current_price.price}}</td>
          <td v-else>N/A</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "gametable",
  props: {
    apps: Array,
  },
  methods: {
    headerImgBuilder(appid) {
      return `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg`;
    },
  },
};
</script>

<style scoped>
/* Change default darkmode tr hover background color */
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #333333;
}
.table-header-color {
  background-color: #333333 !important;
}
.table-wrapper {
  color: #e0e1dd !important;
}
.log-link {
  color: #ed254e !important;
}
</style>