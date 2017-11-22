const url = 'http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/';
const extent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
const resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420];
const projection = new ol.proj.Projection({ code: 'EPSG:28992', units: 'm', extent });

const tileUrlFunction = ([z, y, x]) => y < 0 || x < 0 ? '' : `${url}${z}/${y}/${x}.png`;

const styles = {
    MultiLineString: new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#F44336', width: 2 })
    }),
};

const styleFunction = feature => styles[feature.getGeometry().getType()];

var vectorSource = new ol.source.Vector({
    // features: (new ol.format.GeoJSON()).readFeatures(DATA) 
    features: new ol.format.GeoJSON().readFeatures(DATA, {
        featureProjection: 'EPSG:3857'
    })
});

vectorSource.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: styleFunction
});

const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileImage({
                attributions: [
                    new ol.Attribution({
                        html: 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'
                    })
                ],
                projection,
                tileGrid: new ol.tilegrid.TileGrid({
                    origin: [-285401.92, 22598.08],
                    resolutions
                }),
                tileUrlFunction
            })
        }),
        vectorLayer
    ],
    view: new ol.View({
        minZoom: 3,
        maxZoom: 13,
        projection,
        center: [150000, 400000],
        zoom: 5
    })
});