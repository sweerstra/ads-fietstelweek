const url = 'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/';
const extent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
const resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420];
const projection = new ol.proj.Projection({ code: 'EPSG:28992', units: 'm', extent });

const tileUrlFunction = ([z, x, y]) => y < 0 || x < 0 ? '' : `${url}${z}/${x}/${y}.png`;

const styles = {
    fill: new ol.style.Fill({
        color: 'red'
    }),
    MultiLineString: new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#F44336', width: 2 })
    }),
};

const styleFunction = feature => styles[feature.getGeometry().getType()];

const baseLayer = new ol.layer.Tile({
    source: new ol.source.TileImage({
        projection,
        tileGrid: new ol.tilegrid.TileGrid({
            origin: [-285401.92, 22598.08],
            resolutions
        }),
        tileUrlFunction
    })
});

const streetLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(DATA)
    }),
    style: styleFunction
});

const map = new ol.Map({
    target: 'map',
    layers: [baseLayer, streetLayer],
    view: new ol.View({
        minZoom: 0,
        maxZoom: 13,
        projection,
        center: [150000, 400000],
        zoom: 5
    })
});