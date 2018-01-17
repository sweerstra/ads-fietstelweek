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
      <loader :loading="loading"></loader>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import getFileName from '../data';
  import { getColors, styleMap, getStyle } from '../sld-style';
  import { EventBus } from '../event-bus';
  import Loader from './Loader';

  export default {
    components: { Loader },

    data: () => ({
      mapboxAccessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      map: null,
      streetLayer: null,
      geoLayer: null,
      overlayGeoLayer: null,
      legend: null,
      selectedYear: '2016',
      selectedRoute: 'Tilburg',
      loading: true
    }),

    created() {
      this.$nextTick(() => {
        this.drawMap();

        EventBus.$on('search', (input) => {
          this.map.setView(input.location, 12);
          this.selectedRoute = input.key;

          this.setRouteData(this.selectedRoute, this.selectedYear);
        });
      });
    },

    watch: {
      selectedYear(year) {
        this.setRouteData(this.selectedRoute, year);
      },
    },

    methods: {
      drawMap() {
        const tilburg = [51.568441, 5.153563];
        this.map = L.map('map').setView(tilburg, 13);

        this.streetLayer = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${this.mapboxAccessToken}`, {
          maxZoom: 14,
          id: 'mapbox.light',
        }).addTo(this.map);

        this.setRouteData(this.selectedRoute, this.selectedYear, true)
          .then(() => {
            this.map.attributionControl.addAttribution('Snelfietsroutes in Noord-Brabant');
            this.setLegend();
          });
      },

      setRouteData(route, year, initialize = false) {
        const HOST = '../../static/';
        const filename = getFileName(route, year);
        if (filename === null) return;

        this.loading = true;

        return fetch(HOST + filename)
          .then(resp => resp.json())
          .then((json) => {
            if (!initialize) {
              this.map.removeLayer(this.geoLayer);
            }
            this.geoLayer = L.geoJson(json, { style: this.getStyle }).addTo(this.map);

            return fetch(HOST + 'EV/marked.geojson')
              .then(resp => resp.json())
              .then((jsonTwo) => {
                this.overlayGeoLayer = L.geoJson(jsonTwo, {
                  style: {
                    weight: 15.0,
                    opacity: 1,
                    fillOpacity: 0,
                    color: 'rgba(1,204,255,0.341176470588)'
                  }
                }).addTo(this.map);
                this.loading = false;
              });
          });
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

          div.innerHTML = '<h3 class="heading">Doorrijfactor</h3>'
            + '<span>Percentage gewenste snelheid tegenover reële snelheid.</span>'
            + '<div class="legend-information">' + values.reduce((html, value, index) => {
              return html + `<div class="info">
                        <span>${value}</span>
                        <i style="background:${colors[index]}"></i>
                      </div>`;
            }, '') + '</div>';

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
    z-index: 0;
  }

  @media (min-height: 750px) {
    #map { height: 580px; }
  }
</style>
