<template>
  <div>
    <v-simple-table class="table-wrapper">
      <template v-slot:default>
        <thead class="table-header-color">
          <tr>
            <th class="text-left">Action</th>
            <th class="text-left">Change Number</th>
            <th class="text-left">App</th>
            <th class="text-left">Changelog</th>
            <th class="text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id" class="tr">
            <td v-if="log.action == 'ADD'">
              <v-icon color="#64e384">mdi-plus</v-icon>
            </td>
            <td v-else>
              <v-icon color="#f09148">mdi-tools</v-icon>
            </td>
            <td>{{ log.change_number }}</td>

            <td>
              <nuxt-link
                :to="'/games/' + log.game.appid + '/' + log.game.slug + '/'"
                class="log-link"
              >{{ log.game.name }}</nuxt-link>
            </td>

            <td>{{ log.changelog }}</td>
            <td>{{ log.created_time }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "ChangeLogs",
  props: {
    logs: Array,
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