<template>
  <div>
    <v-card class="grey lighten-4 elevation-0">
      <v-card-text>
        <v-container fluid>
          <v-layout row>
            <v-flex xs8>
              <v-text-field
                name="city"
                :label="mapLabel"
                v-model="city"
                id="city"
                :error="notFound"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-btn id="search" :disabled="!city" @click.native="getBicycleStorage" flat primary>Zoeken</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <ol-map :center="center" :zoom="zoom">
      <ol-marker v-for="(marker, index) in markers" :coords="marker" :key="index"></ol-marker>
    </ol-map>
  </div>
</template>

<script>
  /* eslint-disable no-underscore-dangle,no-console */

  export default {
    data: () => ({
      city: 'Tilburg',
      markers: [],
      center: [5.0808, 51.5590],
      zoom: 13,
      notFound: false,
    }),

    created() {
      this.getBicycleStorage();
    },

    methods: {
      getBicycleStorage() {
        fetch('https://i321720.iris.fhict.nl/fietsenstallingen/data.php')
          .then(data => data.json())
          .then((json) => {
            const value = this.city.toLowerCase();
            const data = json.Fietsenstallingen.Fietsenstalling;
            const storages = data.filter(f => f.Plaats.__cdata.toLowerCase() === value);

            this.notFound = !storages.length;
            if (this.notFound) return;

            this.markers = storages.map(({ Coordinaten }) => (Coordinaten
              ? Coordinaten.split(',').map(Number)
              : undefined));

            this.center = this.markers[0];
            this.zoom = this.markers.length > 10 ? 12 : 13;
          });
      },

      formatStalling(data) {
        return {
          naam: data.Naam.__cdata,
          omschrijving: data.Omschrijving ? data.Omschrijving.__cdata : null,
          gemeente: data.Gemeente.__cdata,
          straat: data.Straat.__cdata,
          postcode: data.Postcode.__cdata,
          plaats: data.Plaats.__cdata,
          url: data.Url,
          toegang: data.Toegangscontrole ? data.Toegangscontrole.__cdata : null,
          capaciteit: data.CapaciteitTotaal,
          openingstijden: data.Openingstijden,
          isStationStalling: data.Stationsstalling.toLowerCase() === 'ja',
          type: data.Type,
          bewaakt: data.Type.toLowerCase() === 'bewaakt',
          beheerder: {
            naam: data.Beheerder.__cdata,
            contact: data.BeheerderContact.__cdata,
          },
        };
      },
    },

    computed: {
      mapLabel() {
        return this.notFound ? 'Geen plaats gevonden' : 'Zoek een plaats';
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
