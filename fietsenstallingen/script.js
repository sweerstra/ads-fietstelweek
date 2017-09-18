(function () {
    const CityInput = document.getElementById('city');
    const NotFoundLabel = document.getElementById('not-found');

    const map = new OpenLayers.Map('map');
    const graphic = 'http://bl.ocks.org/KoGor/raw/81e6ce8945c43405e3e9/9b91f2a958c139a1be50a4cd93bb6d9646bc7b56/bike.svg';

    map.addLayer(new OpenLayers.Layer.OSM());
    const epsg4326 = new OpenLayers.Projection('EPSG:4326');
    const projectTo = map.getProjectionObject();
    const vectorLayer = new OpenLayers.Layer.Vector('Overlay');

    document.addEventListener('DOMContentLoaded', getFietsenstallingen);
    document.getElementById('search').addEventListener('click', getFietsenstallingen);
    CityInput.addEventListener('keyup', (e) => {
        e.preventDefault();

        if (e.keyCode === 13) {
            getFietsenstallingen();
        }
    });

    function getFietsenstallingen() {
        // Tilburg: lon 5.0808, lat 51.5590

        fetch('./data.json')
            .then(data => data.json())
            .then((json) => {
                const cityValue = CityInput.value.toLowerCase();
                if (!cityValue) return;

                const fietsenstalling = json.Fietsenstallingen.Fietsenstalling;
                const stallingenInCity = fietsenstalling.filter(f => f.Plaats.__cdata.toLowerCase() === cityValue);

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
                        { description: 'Marker number ' + index },
                        {
                            externalGraphic: graphic,
                            graphicHeight: 25,
                            graphicWidth: 25,
                            graphicXOffset: -12,
                            graphicYOffset: -25
                        });

                    vectorLayer.addFeatures(feature);
                });

                const [firstLon, firstLat] = markers[0];
                const lonLat = new OpenLayers.LonLat(firstLon, firstLat).transform(epsg4326, projectTo);

                map.setCenter(lonLat, markers.length > 10 ? 12 : 13);

                map.addLayer(vectorLayer);
            });
    }
})()