<template>
  <div id="map">
  </div>
</template>

<script>
  // import routes from '../assets/data/sampleData';
  /* eslint-disable */
  // import { EventBus } from '../event-bus';

  export default {
    data: () => ({
      mapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      map: null,
      tilburg: [51.5590, 5.0808],
      streetLayer: null
    }),

    created() {
      // this.getBicycleStorage('Tilburg');

      // EventBus.$on('search', (input) => {
      //   this.getBicycleStorage(input);
      // });
      this.$nextTick(() => {
        this.drawMap();
      });
    },
    methods: {
      drawMap() {
        this.map = L.map('map').setView(this.tilburg, 10);

        this.streetLayer = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${this.mapboxAccessToken}`, {
          maxZoom: 14,
          crs: L.CRS.Simple,
          id: 'mapbox.light'
        }).addTo(this.map);

        const json = './static/sampleData.json';

        fetch(json)
          .then(resp => resp.json())
          .then((json) => {
            L.geoJson(json).addTo(this.map);
          });

        // this.map.attributionControl.addAttribution('Spatial wildfire occurrence data for the United States, 1992-2014 &copy; <a href="https://doi.org/10.2737/RDS-2013-0009.4">Forest Service Research Data Archive</a>');
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
