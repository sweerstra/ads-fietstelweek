import Vue from 'vue';
import Vuetify from 'vuetify';
import '../node_modules/vuetify/dist/vuetify.min.css';
import VueOpenLayers from './vendor/vue-openlayers';
import '../node_modules/openlayers/css/ol.css';
import App from './App';
import router from './router';

Vue.use(VueOpenLayers);
Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
