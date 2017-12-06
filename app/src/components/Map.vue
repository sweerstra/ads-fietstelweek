<template>
  <div id="map">
  </div>
</template>

<script>
  /* eslint-disable */
  import data from '../../static/tilburg-oisterwijk.json';
  import { getColors, styleMap, getStyle } from '../sld-style';
  import { EventBus } from '../event-bus';

  export default {
    data: () => ({
      mapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      map: null,
      streetLayer: null,
      legend: null,
    }),
    created() {
      this.$nextTick(() => {
        this.drawMap();
        
        EventBus.$on('resize', () => {  
          this.drawMap();
        });

        // EventBus.$on('search', (input) => {
        // });
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

        const style = (feature) => {
          const { properties: { INTENSITEI, SNELHEID_R } } = feature;
          return getStyle(INTENSITEI, SNELHEID_R);
        };

        L.geoJson(data, { style }).addTo(this.map);
        this.map.attributionControl.addAttribution('Snelfietsroutes in Noord-Brabant');
        this.setLegend(this.map);
      },
      setLegend(map) {
        this.legend = L.control({position: 'bottomright'});
        this.legend.onAdd = (map) => {

          var div = L.DomUtil.create('div', 'info-leg legend'),
            values = styleMap,
            colors = getColors();

          div.innerHTML = '<p style="font-size: 16px; font-weight: bold;">Intensiteit</p>'
          div.innerHTML += values.map((x, i) => { 
            const { from, to } = x;
            return '<i style="background:' + colors[i] + '"></i> ' + from + (to ? ' &ndash; ' + to : '+');
          }).join('<br>');

          return div;
        };
        this.legend.addTo(map);
      },
    },
  };
</script>

<style scoped>
  #map { z-index: 1; }

  @media (max-height: 850px) {
    #map { height: 630px; }
  }

  @media (max-height: 820px) {
    #map { height: 570px; }
  }

  @media (max-height: 790px) {
    #map { height: 510px; }
  }
</style>
