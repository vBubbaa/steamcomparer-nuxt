<template>
  <v-card :class="[selected ? activeC : notActive]" color="#333333">
    <v-img :src="user.avatarfull"></v-img>

    <v-card-title>{{ user.personaname }}</v-card-title>

    <v-card-actions>
      <v-btn text color="#ed254e" @click="handleSelect()">Select</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  data() {
    return {
      selected: false,
      selectedFriends: null,
      activeC: "isSelected",
      notActive: "notSelected",
    };
  },
  props: {
    user: Object,
    selectedList: Array,
  },
  methods: {
    handleSelect() {
      this.selected = !this.selected;
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

<style scoped>
.isSelected {
  border: 3px solid #ed254e !important;
}

.notSelected {
  border: none;
}
</style>