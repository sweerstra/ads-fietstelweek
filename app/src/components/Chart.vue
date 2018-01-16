<template>
  <v-container fluid row grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-media src="../static/motive-header.jpg" height="200px">
            <div class="image-label leaflet-control-attribution leaflet-control">
              <a href="https://www.duic.nl/algemeen/fotos-storm-op-fiets-utrecht/" title="duic.nl">duic.nl</a>
            </div>
          </v-card-media>
          <v-container fill-height fluid>
            <v-layout row fill-height>
              <v-flex xs12 align-end flexbox>
                <div>
                  <div class="headline">Motieven fietsers</div>
                  <br>
                  <div>
                    Uit onderzoek is gebleken dat een aantal fysieke attributen invloed
                    hebben op de route die fietsers rijden. Een van die invloeden heeft
                    te maken met het comfort van het wegdek waarover de fietsers rijden.
                    De belangrijke fysieke attributen zijn (gesorteerd op belangrijkheid):
                    een losse fietsbaan, hoge qualiteit wegdek, zonder drempels en non-priority
                    kruisingen, korte reistijd, auto's die niet te snel langsrijden en als laatste
                    zo weinig mogelijk stoplichten.
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12>
        <v-card>
          <v-layout row>
            <v-flex xs12>
              <div class="legend">
                <div class="legend-item">
                  <div class="legend-item-color green"></div>
                  <div>Aspecten van snelfietsroutes</div>
                </div>
                <div class="legend-item">
                  <div class="legend-item-color red"></div>
                  <div>Geminimaliseerd binnen snelfietsroutes</div>
                </div>
                <div class="legend-item">
                  <div class="legend-item-color yellow"></div>
                  <div>Overig</div>
                </div>
              </div>
            </v-flex>
          </v-layout>
          <v-container fill-height fluid>
            <v-layout row align-center fill-height>
              <v-flex class="text-xs-center">
                <canvas id="MotiveChart"></canvas>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <br/>
  </v-container>
</template>

<script>
  /* eslint-disable */
  import Chart from "chart.js";

  export default {
    data: () => ({
      ctx: null,
      myChart: null
    }),
    created() {
      this.$nextTick(() => {
        this.ctx = document.getElementById("MotiveChart").getContext("2d");
        this.myChart = new Chart(this.ctx, {
          type: "bar",
          data: {
            labels: ["Kruispunten", "Tegels", "Kinderkoppen", "Asfalt", "Bomen", "Bebossing", "Verlichting", "Fietsstrook", "Fietspad", "Rotonde", "Verkeerslichten"],
            datasets: [
              {
                label: "Average evaluation score",
                data: [2.05, 2.85, 2.4, 3.9, 3.15, 2.8, 3.75, 3.25, 4.05, 3.35, 2.9],
                backgroundColor: [
                  'rgba(255, 99, 99, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 120, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 120, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 120, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 99, 99, 0.2)',

                ],
                borderColor: [
                  'rgba(255, 99, 99, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 120, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 120, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 120, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 99, 99, 1)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            legend: {
              display: false,
            }
          }
        });
      });
    },
    methods: {}
  };
</script>

<style scoped>
  #MotiveChart {
    width: 875px !important;
    height: 400px !important;
    margin: 0 auto !important;
  }

  .legend {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 4px;
  }

  .legend-item-color {
    width: 24px;
    height: 16px;
    margin: 4px;
  }

  .green {
    background-color: rgba(75, 192, 120, 0.2) !important;
    border: 1px solid rgba(75, 192, 120, 1)
  }

  .yellow {
    background-color: rgba(255, 206, 86, 0.2) !important;
    border: 1px solid rgba(255, 206, 86, 1);
  }

  .red {
    background-color: rgba(255, 99, 99, 0.2) !important;
    border: 1px solid rgba(255, 99, 99, 1);
  }
</style>
