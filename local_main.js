/*
 * @Descripttion: 
 * @version: 
 * @Author: Qi Baoye
 * @Date: 2022-05-16 10:09:39
 * @LastEditors: Qi Baoye
 * @LastEditTime: 2022-05-16 10:10:28
 */

var map = L.map('map', {
    center: [39.90,116.38],
    zoom: 11,
    // layers: [grayscale, cities]
});



var baseLayers = {
    'satellites': L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXJpY2hhIiwiYSI6ImNrZTdqbWo2ZjFuZnIzNW80cW5mY3hic28ifQ.lwwOhC18IW8SBzqUqOAhWQ', {
        maxZoom: 18,
        attribution:"Sputnik Layer"
    }),

    "CartoDB Positron": L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),

    "OSM": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map),

    "高德": L.tileLayer('http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}', {
        maxZoom: 18
    })
};

var layerControl = L.control.layers(baseLayers, {}, {
    position: 'topright',
    collapsed: true
}).addTo(map);


var geojson = L.geoJson(geojsonSample, {

    style: function (feature) {
        return {color: feature.properties.color};
    },

    onEachFeature: function (feature, layer) {
        var popupText = 'address: ' + feature.properties.poi_addres;

        if (feature.properties.color) {
            popupText += '<br/>color: ' + feature.properties.color;
        }

        layer.bindPopup(popupText);
    }
});
var markers = L.markerClusterGroup();
markers.addLayer(geojson);

map.addLayer(markers);