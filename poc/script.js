var extent = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
var resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420];
var projection = new ol.proj.Projection({ code: 'EPSG:900913', units: 'm', extent: extent });

var url = 'http://app.cycleprint.eu/map1/';

var tileUrlFunction = function (tileCoord, pixelRatio, projection) {
    var zxy = tileCoord;
    if (zxy[1] < 0 || zxy[2] < 0) {
        return "";
    }
    return url +
        zxy[0].toString() + '/' + zxy[1].toString() + '/' +
        zxy[2].toString() + '.png';
};

var image = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({ color: 'red', width: 1 })
});

var styles = {
    'Point': new ol.style.Style({
        image: image
    }),
    'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new ol.style.Style({
        image: image
    }),
    'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};

var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};

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

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileImage({
                attributions: [
                    new ol.Attribution({
                        html: 'Kaartgegevens: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>'
                    })
                ],
                projection: projection,
                tileGrid: new ol.tilegrid.TileGrid({
                    origin: [-285401.92, .08],
                    resolutions: resolutions
                }),
                tileUrlFunction: tileUrlFunction
            })
        }),

        vectorLayer
    ],
    view: new ol.View({
        minZoom: 3,
        maxZoom: 13,
        projection: projection,
        center: [150000, 450000],
        zoom: 3
    })
});