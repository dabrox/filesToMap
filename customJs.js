//set main view
var map = L.map("map").setView([41.66, -4.72], 3);

//adding layer
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 4,
}).addTo(map);

//adding scale as a layer
L.control.scale().addTo(map);

//adding countries as a layer
L.geoJson(countries).addTo(map);

//Function to configurate colors by population scale
function getColor(d) {
  return d > 100000000
    ? "#800026"
    : d > 50000000
    ? "#BD0026"
    : d > 20000000
    ? "#E31A1C"
    : d > 10000000
    ? "#FC4E2A"
    : d > 5000000
    ? "#FD8D3C"
    : d > 2000000
    ? "#FEB24C"
    : d > 1000000
    ? "#FED976"
    : "#FFEDA0";
}

//Function to fill color by "feature.properties.POP_EST"
function style(feature) {
  return {
    fillColor: getColor(feature.properties.POP_EST),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "1",
    fillOpacity: 0.3,
  };
}

//Function to add style on the layer
L.geoJson(countries, { style: style }).addTo(map);

//Function to open a pop up when a country is clicked
function popup(feature, layer) {
  if (feature.properties && feature.properties.NAME) {
    layer.bindPopup(feature.properties.NAME);
  }
}

//Function to add popup as a layer
geojson = L.geoJson(countries, {
  style: style,
  onEachFeature: popup,
}).addTo(map);
