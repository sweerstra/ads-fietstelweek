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
      <v-text-field
        v-model="city"
        id="city"
        placeholder="Zoek een plaats"
        append-icon="search"
        dark
        autocomplete="off"
        @keyup.enter="searchMap"
      ></v-text-field>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer
      :fixed="fixed">
      <span>&copy; 2017 - Bicycle data</span>
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
      city: '',
    }),

    methods: {
      searchMap() {
        EventBus.$emit('search', this.city);
      },
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

  #city {
    caret-color: white;
  }

  .input-group__append-icon {
    color: white !important;
  }
</style>
