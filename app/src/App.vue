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
      <v-toolbar-side-icon class="white--text"
                           @click="resize"
                           @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        v-bind:items="routes"
        v-model="route"
        item-text="value"
        item-value="key"
        id="route"
        placeholder="Kies een snelfietsroute"
        dark
        return-object
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
        { icon: 'home', title: 'Home', to: '/' },
        { icon: 'network_check', title: 'Chart', to: '/chart' },
      ],
      clipped: true,
      enableResize: true,
      title: 'Fast Cycle Routes',
      fixed: true,
      route: '',
      routes: [
        {
          key: 'Oss',
          value: 'Oss - Den Bosch',
          location: [51.761180, 5.514048],
        },
        {
          key: 'Eindhoven',
          value: 'Eindhoven - Valkenswaard',
          location: [51.441642, 5.469722],
        },
        {
          key: 'Tilburg',
          value: 'Tilburg - Oisterwijk',
          location: [51.565424, 5.203028],
        },
      ],
    }),
    watch: {
      route: (newValue) => {
        EventBus.$emit('search', newValue);
      },
    },
    methods: {
      resize() {
        EventBus.$emit('resize');
      },
    },
  };
</script>

<style>
  html, body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  #e3, #e3 .container {
    min-height: 600px;
    overflow: hidden;
    z-index: 0;
  }

  #e3 .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }

  .input-group__append-icon {
    color: rgba(255, 255, 255, 0.32) !important;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: rgba(255, 255, 255, 0.8);
  }

  #route {
    caret-color: white;
  }

  .list__tile--active {
    color: red !important;
  }

  .input-group__append-icon {
    color: white !important;
  }
</style>
