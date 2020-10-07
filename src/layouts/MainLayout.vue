<template>
  <q-layout view="hHh lpR lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
        <q-btn
          to="/auth"
          v-if="!loggedIn"
          icon-right="account_circle"
          label="Login"
          flat
          class="absolute-right"
        />
        <q-btn
          v-else
          icon-right="account_circle"
          label="Logout"
          flat
          @click="logoutUser()"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-footer class="foot">
      <q-tabs>
        <q-route-tab
          v-for="(link, index) in this.essentialLinks"
          :icon="link.icon"
          :label="link.title"
          :to="link.link"
          :key="index"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      content-class="bg-grey-1"
      :breakpoint="767"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> Navigation </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapState } from "vuex";
import {mapActions } from 'vuex'

const linksData = [
  {
    title: "Todo",
    caption: "List of todos",
    icon: "list",
    link: "/",
  },
  {
    title: "Settings",
    caption: "Customize settings",
    icon: "settings",
    link: "/settings",
  },
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
};
</script>
<style scoped>
@media screen and (min-width: 768px) {
  .foot {
    display: none;
  }
}
</style>