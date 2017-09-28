import olMap from '../../node_modules/vue-openlayers/src/ol-map';
import olMarker from '../../node_modules/vue-openlayers/src/ol-marker';
import olBalloon from '../../node_modules/vue-openlayers/src/ol-balloon';

export default {
  install(Vue) {
    // wiring project components
    Vue.component('ol-map', olMap);
    Vue.component('ol-marker', olMarker);
    Vue.component('ol-balloon', olBalloon);
  },
};
