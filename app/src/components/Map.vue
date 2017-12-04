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
  #map { z-index: 1; }

  @media (min-height: 600px) {
    #map { height: 570px; }
  }

  @media (min-height: 700px) {
    #map { height: 630px; }
  }

  @media (min-height: 800px) {
    #map { height: 700px; }
  }
</style>
