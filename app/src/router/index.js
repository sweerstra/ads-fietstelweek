import Vue from 'vue';
import Router from 'vue-router';
import MapRoute from '@/components/Map';
import Graph from '@/components/Graphs';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: MapRoute,
    },
    {
      path: '/graph',
      name: 'Graphs',
      component: Graph,
    },
  ],
});
