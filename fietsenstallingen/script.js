(function () {
    const CityInput = document.getElementById('city');
    const NotFoundLabel = document.getElementById('not-found');
    const Sidebar = document.getElementById('sidebar');

    const map = new OpenLayers.Map('map');
    const graphic = 'http://bl.ocks.org/KoGor/raw/81e6ce8945c43405e3e9/9b91f2a958c139a1be50a4cd93bb6d9646bc7b56/bike.svg';

    map.addLayer(new OpenLayers.Layer.OSM());
    const epsg4326 = new OpenLayers.Projection('EPSG:4326');
    const projectTo = map.getProjectionObject();
    const vectorLayer = new OpenLayers.Layer.Vector('Overlay', {
        eventListeners: {
            featureclick(e) {
                const { stalling } = e.feature.data;
                Sidebar.innerHTML = Object.keys(stalling).map(key => key + ': ' + stalling[key] + '<br/>');
            }
        }
    });

    document.addEventListener('DOMContentLoaded', getFietsenstallingen);
    document.getElementById('search').addEventListener('click', getFietsenstallingen);
    CityInput.addEventListener('keyup', (e) => {
        e.preventDefault();

        if (e.keyCode === 13) {
            getFietsenstallingen();
        }
    });

    function getFietsenstallingen() {
        fetch('./data.json')
            .then(data => data.json())
            .then((json) => {
                const value = CityInput.value.toLowerCase();
                if (!value) return;

                const fietsenstalling = json.Fietsenstallingen.Fietsenstalling;
                const stallingenInCity = fietsenstalling.filter(f => f.Plaats.__cdata.toLowerCase() === value);

                NotFoundLabel.style.display = stallingenInCity.length ? 'none' : 'inline';
                if (stallingenInCity.length === 0) return;

                const markers = stallingenInCity.map(({ Coordinaten }) => Coordinaten
                    ? Coordinaten.split(',').map(Number)
                    : undefined).filter(Boolean);

                vectorLayer.destroyFeatures();

                markers.forEach((marker, index) => {
                    const [lon, lat] = marker;

                    const feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.Point(lon, lat).transform(epsg4326, projectTo),
                        { index, stalling: formatStalling(stallingenInCity[index]) },
                        {
                            externalGraphic: graphic,
                            graphicHeight: 25,
                            graphicWidth: 25,
                            cursor: 'pointer'
                        });

                    vectorLayer.addFeatures(feature);
                });

                const [firstLon, firstLat] = markers[0];
                const lonLat = new OpenLayers.LonLat(firstLon, firstLat).transform(epsg4326, projectTo);

                map.setCenter(lonLat, markers.length > 10 ? 12 : 13);

                map.addLayer(vectorLayer);
            });
    }

    function formatStalling(data) {
        return {
            naam: data.Naam.__cdata,
            omschrijving: data.Omschrijving ? data.Omschrijving.__cdata : null,
            gemeente: data.Gemeente.__cdata,
            straat: data.Straat.__cdata,
            postcode: data.Postcode.__cdata,
            plaats: data.Plaats.__cdata,
            url: data.Url,
            toegang: data.Toegangscontrole ? data.Toegangscontrole.__cdata : null,
            capaciteit: data.CapaciteitTotaal,
            openingstijden: data.Openingstijden,
            isStationStalling: data.Stationsstalling.toLowerCase() === 'ja',
            type: data.Type,
            bewaakt: data.Type.toLowerCase() === 'bewaakt',
            beheerder: {
                naam: data.Beheerder.__cdata,
                contact: data.BeheerderContact.__cdata
            }
        };
    }
})()