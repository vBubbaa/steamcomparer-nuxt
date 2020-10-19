<template>
  <v-card
    class="mx-auto user-card"
  >
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="user.avatar"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.personaname }}</v-list-item-title>
        </v-list-item-content>

        <div>
            <v-checkbox color="#ed254e" v-model="selected" @change="handleSelect()"></v-checkbox>
        </div>

      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "userlistitem",
  data() {
    return {
      selected: false,
      selectedFriends: null,
    };
  },
  props: {
    user: Object,
    selectedList: Array,
  },
  methods: {
    handleSelect() {
      this.$emit("selectFriend", this.user);
    },
  },
  created() {
    if (this.selectedList.some((e) => e === this.user)) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.user-card {
    width: 100%;
}
</style>