import Vue from 'vue';
import Router from 'vue-router';
import MapRoute from '@/components/Map';
import Chart from '@/components/Chart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: MapRoute,
    },
    {
      path: '/chart',
      name: 'Charts',
      component: Chart,
    },
  ],
});
