const tilburg = [51.5590, 5.0808];
const map = L.map('map').setView(tilburg, 10);

const streetLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    crs: L.CRS.Simple,
    id: 'mapbox.light'
}).addTo(map);

const geojson = L.geoJson(DATA).addTo(map);