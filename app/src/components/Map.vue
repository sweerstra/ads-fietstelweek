<template>
  <div id="map">
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  import data from '../../static/tilburg-oisterwijk.json';

  export default {
    data: () => ({
      mapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      map: null,
      streetLayer: null,
    }),

    created() {
      this.$nextTick(() => {
        this.drawMap();
      });
    },
    methods: {
      drawMap() {
        const tilburg = [51.5590, 5.0808];
        this.map = L.map('map').setView(tilburg, 10);

        this.streetLayer = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${this.mapboxAccessToken}`, {
          maxZoom: 14,
          id: 'mapbox.light',
        }).addTo(this.map);

        L.geoJson(data).addTo(this.map);

        this.map.attributionControl.addAttribution('Snelfietsroutes in Noord-Brabant');
      },
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

  #map {
    height: 90vh;
    z-index: 1;
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
