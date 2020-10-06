<template>
  <q-input
    outlined
    bottom-slots
    v-select-all
    v-model="searchField"
    label="Search..."
    @keyup.esc="searchField = ''"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { selectAll } from "src/directives/select-all";

import { mapState, mapActions } from "vuex";
export default {
  directives: {
    selectAll,
  },
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.$store.setSarch;
        this.setSearch(value);
      },
    },
  },
  methods: {
    ...mapActions("tasks", ["setSearch"]),
  },
};
</script>

<style>
</style>