<template>
  <ol-map :center="center" :zoom="zoom">
    <ol-marker v-for="(marker, index) in markers" :coords="marker" :key="index"></ol-marker>
  </ol-map>
</template>

<script>
  /* eslint-disable no-underscore-dangle,no-console */
  // import { EventBus } from '../event-bus';

  export default {
    data: () => ({
      markers: [],
      center: [5.0808, 51.5590],
      zoom: 13,
    }),

    created() {
      // this.getBicycleStorage('Tilburg');

      // EventBus.$on('search', (input) => {
      //   this.getBicycleStorage(input);
      // });
    },
  };
</script>

<style scoped>
  html, body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  header {
    margin: 20px;
  }

  label#not-found {
    color: red;
    vertical-align: middle;
    margin-left: 10px;
  }

  aside {
    width: 300px;
    padding: 0 20px;
  }

  aside #properties {
    overflow-y: auto;
  }

  .heading {
    font-weight: bold;
    font-size: 20px;
  }

  .property {
    font-weight: bold;
  }

  @media (max-width: 996px) {
    #map {
      width: 100%;
    }
  }
</style>
