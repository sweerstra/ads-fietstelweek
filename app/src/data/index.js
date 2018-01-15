const Files = {
  Oss: [
    { year: '2015', name: 'oss-denbosch-2015.geojson' },
    { year: '2016', name: 'oss-denbosch-2016.geojson' },
    { year: '2017', name: 'oss-denbosch-2017.geojson' },
  ],
  Eindhoven: [
    { year: '2015', name: 'snelfietsroutes-2015.geojson' },
    { year: '2016', name: 'Snelfietsroutes2016.geojson' },
    { year: '2017', name: 'Snelfietsroutes2017.geojson' },
  ],
  Tilburg: [
    { year: '2015', name: null },
    { year: '2016', name: 'tilburg-oisterwijk-2016.geojson' },
    { year: '2017', name: null },
  ],
};

const getFileName = (key, year) => {
  if (!key || !year) return null;

  const routes = Files[key];
  const index = routes.findIndex(route => route.year === year);

  return index !== -1
    ? routes[index].name
    : null;
};

export default getFileName;
