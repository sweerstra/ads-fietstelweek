const Files = {
  Oss: [
    { year: '2015', name: 'ODB/ODB2015.geojson' },
    { year: '2016', name: 'ODB/ODB2016.geojson' },
    { year: '2017', name: 'ODB/ODB2017.geojson' },
  ],
  Eindhoven: [
    { year: '2015', name: 'EV/EV2015.geojson' },
    { year: '2016', name: 'EV/EV2016.geojson' },
    { year: '2017', name: 'EV/EV2017.geojson' },
  ],
  Tilburg: [
    { year: '2015', name: 'TO/TO2015.geojson' },
    { year: '2016', name: 'TO/TO2016.geojson' },
    { year: '2017', name: 'TO/TO2017.geojson' },
  ],
  Ettenleur: [
    { year: '2015', name: 'ELB/ELB2015.geojson' },
    { year: '2016', name: 'ELB/ELB2016.geojson' },
    { year: '2017', name: 'ELB/ELB2017.geojson' },
  ],
  Veghel: [
    { year: '2015', name: 'VDB/VDB2015.geojson' },
    { year: '2016', name: 'VDB/VDB2016.geojson' },
    { year: '2017', name: 'VDB/VDB2017.geojson' },
  ],
};

const getFileName = (routeKey, year) => {
  const routes = Files[routeKey];
  const index = routes.findIndex(route => route.year === year);

  return index !== -1
    ? routes[index].name
    : null;
};

export default getFileName;
