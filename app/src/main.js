import Vue from 'vue';
import VueOpenLayers from 'vue-openlayers';
import '../node_modules/openlayers/css/ol.css';
import App from './App';
import router from './router';

Vue.use(VueOpenLayers);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
