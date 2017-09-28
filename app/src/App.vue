<template>
  <v-app light toolbar footer>
    <v-navigation-drawer
      persistent
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
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed class="red">
      <v-toolbar-side-icon class="white--text" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-btn>
      <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer
      :fixed="fixed">
      <v-spacer></v-spacer>
      <span>&copy; 2017 - Bicycle data</span>
    </v-footer>
  </v-app>
</template>

<script>
  /* eslint-disable */

  export default {
    data: ()  => ({
      drawer: true,
      fixed: true,
      items: [
        {icon: 'home', title: 'Home', to: '/'},
        {icon: 'network_check', title: 'Graphs', to: '/graph'}
      ],
      right: false,
      rightDrawer: false,
      enableResize: true,
      title: 'Bicycle data'
    })
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
