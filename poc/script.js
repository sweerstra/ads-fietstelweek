var map = L.map('map').setView([37.8, -96], 4);

var factorx = 0.125
var factory = 0.125

L.CRS.pr = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  transformation: new L.Transformation(factorx, 0, -factory, 0),
  // Changing the transformation is the key part, everything else is the same.
  // By specifying a factor, you specify what distance in meters one pixel occupies (as it still is CRS.Simple in all other regards).
  // In this case, I have a tile layer with 256px pieces, so Leaflet thinks it's only 256 meters wide.
  // I know the map is supposed to be 2048x2048 meters, so I specify a factor of 0.125 to multiply in both directions.
  // In the actual project, I compute all that from the gdal2tiles tilemapresources.xml, 
  // which gives the necessary information about tilesizes, total bounds and units-per-pixel at different levels.


// Scale, zoom and distance are entirely unchanged from CRS.Simple
  scale: function(zoom) {
    return Math.pow(2, zoom);
  },

  zoom: function(scale) {
    return Math.log(scale) / Math.LN2;
  },

  distance: function(latlng1, latlng2) {
    var dx = latlng2.lng - latlng1.lng,
      dy = latlng2.lat - latlng1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	crs: L.CRS.pr,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.light'
}).addTo(map);