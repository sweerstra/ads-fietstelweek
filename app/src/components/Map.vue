<template>
  <div>
    <header>
      <h2>Zoek naar fietsenstallingen</h2>
      <input id="city" v-model="city" title="city"/>
      <button id="search" :disabled="!city" @click="getBicycleStorage">Zoek</button>
      <label id="not-found" v-if="notFound">Deze plaats is niet gevonden.</label>
    </header>

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
  };
</script>

<style>
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
