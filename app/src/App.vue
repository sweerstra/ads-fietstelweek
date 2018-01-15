<template>
  <v-app id="e3" light toolbar footer>
    <v-navigation-drawer
      persistent
      :clipped="clipped"
      :enable-resize-watcher="enableResize"
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          router
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon class="red--text" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="black--text" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed class="red">
      <v-toolbar-side-icon class="white--text" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        v-if="$route.name === 'Map'"
        v-bind:items="routes"
        v-model="route"
        item-text="value"
        item-value="key"
        id="route"
        placeholder="Kies een snelfietsroute"
        dark
        return-object
        @change="routeChange"
        @keyup.enter="searchMap"
      ></v-select>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer
      :fixed="fixed">
      <span>&copy; 2017 - Fast Cycle Routes</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
  import { EventBus } from './event-bus';

  export default {
    data: () => ({
      drawer: true,
      items: [
        { icon: 'search', title: 'Wat zijn snelfietsroutes?', to: '/research' },
        { icon: 'map', title: 'Snelfietsroutes in kaart', to: '/' },
        { icon: 'bar_chart', title: 'Motieven fietsers', to: '/chart' },
      ],
      clipped: true,
      enableResize: true,
      title: 'Fast Cycle Routes',
      fixed: true,
      route: 'Tilburg',
      routes: [
        {
          key: 'Oss',
          value: 'Oss - Den Bosch',
          location: [51.7377855, 5.4582737],
        },
        {
          key: 'Eindhoven',
          value: 'Eindhoven - Valkenswaard',
          location: [51.381642, 5.469722],
        },
        {
          key: 'Tilburg',
          value: 'Tilburg - Oisterwijk',
          location: [51.568441, 5.153563],
        },
        {
          key: 'Ettenleur',
          value: 'Ettenleur - Breda',
          location: [51.586998, 4.709095],
        },
        {
          key: 'Veghel',
          value: 'Veghel - Den Bosch',
          location: [51.65667, 5.47861],
        },
      ],
    }),

    methods: {
      routeChange(route) {
        EventBus.$emit('search', route);
      },
    },
  };
</script>

<style scoped>
  #e3, #e3 .container {
    min-height: 600px;
    overflow: hidden;
    z-index: 0;
  }

  .list__tile--active {
    color: red !important;
  }
</style>
