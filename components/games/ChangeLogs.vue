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
          <tr v-for="log in logs" :key="log.id">
            <td v-if="log.action == 'ADD'">
              <v-icon color="#64e384">mdi-plus</v-icon>
            </td>
            <td v-else>
              <v-icon color="#f09148">mdi-tools</v-icon>
            </td>
            <td>{{ log.change_number }}</td>
            <td>{{ log.game.name }}</td>
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
.table-wrapper {
  color: #e0e1dd !important;
}
.table-header-color {
  background-color: #333333 !important;
}
</style>