<template>
  <v-btn class="linkbutton" text outlined>
    <nuxt-link class="button-link" :to="'/' + to"
      >{{ text }}
      <v-icon>{{ icon }} </v-icon>
    </nuxt-link>
  </v-btn>
</template>

<script>
export default {
  name: "LinkButton",
  props: {
    text: String,
    to: String,
    icon: String
  }
};
</script>

<style scoped>
.linkbutton {
  border-color: #ed254e !important;
}

.button-link {
  color: #ed254e !important;
  font-weight: bold;
}
</style>
