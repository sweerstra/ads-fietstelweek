<template>
  <div>
    <v-card dark id="card" height="50px">
      <v-bottom-nav
        absolute
        :value="true"
        color="transparent">
        <v-btn flat color="teal" value="place">
          <span>2015</span>
          <v-icon>place</v-icon>
        </v-btn>
        <v-btn flat color="teal" value="place">
          <span>2016</span>
          <v-icon>place</v-icon>
        </v-btn>
        <v-btn flat color="teal" value="place">
          <span>2017</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
    <div id="map">
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import data from '../../static/tilburg-oisterwijk.json';
  // import data from '../../static/oss-denbosch-2015.json';
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

        EventBus.$on('search', (input) => {
          this.map.setView(input.location, 12);
        });
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
        this.setLegend();
      },
      setLegend() {
        this.legend = L.control({ position: 'bottomright' });
        this.legend.onAdd = () => {
          const colors = getColors();
          const div = document.createElement('div');
          div.id = 'legend';

          div.innerHTML = '<h3 class="heading">Intensiteit</h3>' +
            styleMap.reduce((html, obj, index) => {
              const { from, to } = obj;
              html += `<div class="info">
                        <span>${from}${to ? ' &ndash; ' + to : '+'}</span>
                        <i style="background:${colors[index]}"></i>
                      </div>`;
              return html;
            }, '');

          return div;
        };

        this.legend.addTo(this.map);
      },
    },
  };
</script>

<style scoped>
  #map {
    height: 570px;
    z-index: 1;
  }

  @media (min-height: 750px) {
    #map { height: 630px; }
  }

  .card {
    z-index: 0;
  }

  .bottom-nav {
    background: #f44336 !important;
  }
</style>
