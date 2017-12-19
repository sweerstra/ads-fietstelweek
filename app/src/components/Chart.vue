<template>
  <v-container fluid row grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-media src="/static/motive-header.jpg" height="200px">
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
      <v-flex xs12 sm6>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row fill-height>
              <v-flex xs12 align-end flexbox>  
                <canvas id="MotiveChart"></canvas>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
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
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
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
          }
        }
      });
    });
  },
  methods: {}
};
</script>

<style>
#MotiveChart {
  width: 400px !important;
  height: 400px !important;
}
</style>