<template>
  <div>
    <v-card
      id="card"
      height="56px">
      <v-bottom-nav absolute :value="true" :active.sync="selectedYear" class="transparent">
        <v-btn flat class="red--text" value="2015">
          <span>2015</span>
          <v-icon>place</v-icon>
        </v-btn>
        <v-btn flat class="red--text" value="2016">
          <span>2016</span>
          <v-icon>place</v-icon>
        </v-btn>
        <v-btn flat class="red--text" value="2017">
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
  import data from '../../static/tilburg-oisterwijk-2016.json';
  import { getColors, styleMap, getStyle } from '../sld-style';
  import { EventBus } from '../event-bus';

  export default {
    data: () => ({
      mapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      map: null,
      streetLayer: null,
      geoLayer: null,
      legend: null,
      selectedYear: '2016',
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
    watch: {
      selectedYear(year) {
        const filename = '../../static/tilburg-oisterwijk';
        fetch(`${filename}-${year}.json`)
          .then(resp => resp.json())
          .then((json) => {
            this.map.removeLayer(this.geoLayer);
            this.geoLayer = L.geoJson(json, { style: this.getStyle }).addTo(this.map);
          });
      },
    },
    methods: {
      drawMap() {
        const tilburg = [51.5590, 5.0808];
        this.map = L.map('map').setView(tilburg, 10);

        this.streetLayer = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${this.mapboxAccessToken}`, {
          maxZoom: 14,
          id: 'mapbox.light',
        }).addTo(this.map);

        this.geoLayer = L.geoJson(data, { style: this.getStyle }).addTo(this.map);

        this.map.attributionControl.addAttribution('Snelfietsroutes in Noord-Brabant');
        this.setLegend();
      },
      getStyle(feature) {
        const { properties: { INTENSITEI, SNELHEID_R } } = feature;
        return getStyle(INTENSITEI, SNELHEID_R);
      },
      setLegend() {
        this.legend = L.control({ position: 'bottomright' });
        this.legend.onAdd = () => {
          const colors = getColors().reverse();
          const div = document.createElement('div');
          div.id = 'legend';

          const values = ['90% - 100%', '80% - 90%', '70% - 80%', '60% - 70%', '50% - 60%', '40% - 50%', '30% - 40%', '20% - 30%', '10% - 20%', '0% - 10%'];

          div.innerHTML = '<h3 class="heading">Doorrijfactor</h3>' +
            '<span>Percentage gewenste snelheid tegenover reële snelheid</span>' +
            styleMap.reduce((html, obj, index) => {
              const { from, to } = obj;
              html += `<div class="info">
                        <span>${values[index]}</span>
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
    height: 520px;
    z-index: 1;
  }

  @media (min-height: 750px) {
    #map { height: 580px; }
  }

  /* .card {
    z-index: 0;
  } */

  /* .bottom-nav {
    background: #f44336 !important;
  } */
</style>
