<template>
  <div id="map">
  </div>
</template>

<script>
  /* eslint-disable */
  // import { EventBus } from '../event-bus';

  export default {
    data: () => ({
      mapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      map: ''
    }),

    created() {
      // this.getBicycleStorage('Tilburg');

      // EventBus.$on('search', (input) => {
      //   this.getBicycleStorage(input);
      // });
      this.$nextTick(() => {    
        this.drawMap(this.slider);
      });
    },
    methods: {
      drawMap() {
        this.map = L.map('map').setView([37.8, -96], 4);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
          id: 'mapbox.light'
        }).addTo(this.map);

        var statesFile = '/static/sampleData.json'
          fetch(statesFile).then(resp => resp.json()).then((json) => {

            L.geoJson(json).addTo(this.map);
          })

        this.map.attributionControl.addAttribution('Spatial wildfire occurrence data for the United States, 1992-2014 &copy; <a href="https://doi.org/10.2737/RDS-2013-0009.4">Forest Service Research Data Archive</a>');
      }
    }
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
