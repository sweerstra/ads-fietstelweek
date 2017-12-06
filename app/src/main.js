import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';

import './assets/map.css';

import App from './App';
import router from './router';

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
