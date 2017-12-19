<template>
  <v-container fluid row grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-media src="/static/fiets-header.jpg" height="200px">
          </v-card-media>
          <v-container fill-height fluid>
            <v-layout row fill-height>
              <v-flex xs12 align-end flexbox>
                <div>
                  <div class="headline">Snelfietsroutes</div>
                  <br>
                  <div>
                    Sinds een aantal jaar is er een nieuw soort fietspad in opmars:
                    de snelfietsroute. Een snelfietsroute laat zich typeren als een
                    comfortabele fietsroute die stedelijke regio’s met elkaar verbind.
                    Zoals de naam doet vermoeden is de route dusdanig geoptimaliseerd
                    om een zo hoog mogelijke doorrij factor te creëren. Door obstakels
                    zoals verkeerslichten te verwijderen, worden fietsers aangemoedigd
                    om door te fietsen. Kruisingen en bochten worden vermeden. Goede
                    verlichting maakt het mogelijk dat de route ook ’s avonds goed
                    is te berijden.
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <br/>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row fill-height>
              <v-flex xs12 align-end flexbox>
                <div class="headline">Fietspaden</div>
                <br>
                <div>
                  Nederland kent een zeer uitgebreid netwerk van fietspaden. De
                  laatste cijfers (uit 2012) tonen aan dat er ruim 34.000 kilometer
                  aan fietspaden ligt. Waarschijnlijk zijn dit er meer aangezien
                  de meest recente cijfers vijf jaar geleden zijn verzameld.
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-spacer/>
        <v-data-table
          v-bind:headers="lanesHeader"
          :items="lanes"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" scope="props">
            <td class="text-xs-right">{{ props.item.province }}</td>
            <td class="text-xs-right">{{ props.item.distance }}</td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row fill-height>
              <v-flex xs12 align-end flexbox>
                <div class="headline">Nederland en fietsen</div>
                <br>
                <div>
                  Nederland is bij uitstek een land dat graag fietst. Verschillende
                  cijfers bevestigen dit. Volgens de laatste schatting van
                  brancheverenigingen BOVAG en RAI waren er in 2016 ongeveer
                  22,8 miljoen fietsen. Dat betekent dat iedere Nederlander gemiddeld
                  1,3 fiets bezit, de hoogste fietsdichtheid ter wereld. Nederland
                  telt dus meer fietsers dan inwoners.
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <br/>
        <!-- <v-data-table
          v-bind:headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
        <template slot="items" scope="props">
          <td>{{ props.item.jaar }}</td>
          <td class="text-xs-right">{{ props.item.fietsen }}</td>
          <td class="text-xs-right">{{ props.item.ebikes }}</td>
        </template>
      </v-data-table> -->
        <v-card-media src="/static/fiets-card.jpg" height="500px">
        </v-card-media>
      </v-flex>
    </v-layout>
    <br/>
  </v-container>
</template>

<script>
  /* eslint-disable */
  export default {
    data: () => ({
      headers: [
        {
          text: 'Jaar',
          align: 'left',
          sortable: false,
          value: 'jaar',
        },
        { text: 'Aantal fietsen', value: 'fietsen' },
        { text: 'Aantal e-bikes', value: 'ebikes' },
      ],
      items: [
        {
          value: false,
          jaar: '2000',
          fietsen: '17,8 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2005,
          fietsen: '18,0 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2006,
          fietsen: '18,0 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2007,
          fietsen: '18,0 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2008,
          fietsen: '18,0 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2009,
          fietsen: '19,0 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2010,
          fietsen: '20,0 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2011,
          fietsen: '20,8 miljoen',
          ebikes: 0,
        },
        {
          value: false,
          jaar: 2012,
          fietsen: '22,3 miljoen',
          ebikes: 'waarvan 1 miljoen',
        },
        {
          value: false,
          jaar: 2013,
          fietsen: '22,3 miljoen',
          ebikes: 'waarvan 1 miljoen',
        },
        {
          value: false,
          jaar: 2014,
          fietsen: '22,5 miljoen',
          ebikes: 'waarvan 1,2 miljoen',
        },
        {
          value: false,
          jaar: 2015,
          fietsen: '22,7 miljoen',
          ebikes: 'waarvan 1,3 miljoen',
        },
        {
          value: false,
          jaar: 2016,
          fietsen: '22,8 miljoen',
          ebikes: 'waarvan 1,4 miljoen',
        },
      ],
      lanesHeader: [
        { text: 'Totaal Nederland', value: 'province' },
        { text: '34.200 km', value: 'distance' },
      ],
      lanes: [
        {
          province: 'Groningen',
          distance: '1.600 km',
        },
        {
          province: 'Friensland',
          distance: '2.000 km',
        },
        {
          province: 'Drenthe',
          distance: '2.100 km',
        },
        {
          province: 'Overijssel',
          distance: '2.800 km',
        },
        {
          province: 'Flevoland',
          distance: '1.500 km',
        },
        {
          province: 'Noord-Holland',
          distance: '4.200 km',
        },
        {
          province: 'Uthrecht',
          distance: '1.800 km',
        },
        {
          province: 'Noord-Brabant',
          distance: '5.000 km',
        },
        {
          province: 'Gelderland',
          distance: '5.000 km',
        },
        {
          province: 'Limburg',
          distance: '2.000 km',
        },
        {
          province: 'Zeeland',
          distance: '1.400 km',
        },
      ]
    })
  };
</script>
