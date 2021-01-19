// Creating map object
var myMap = L.map("mapid", {
    center: [40.7128, -74.0059],
    zoom: 11
  });

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);


var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url, function(response) {
    //console.log (response)
    // Creating a geoJSON layer with the retrieved data
    // L.geoJson(data, {
    //   style: function(feature) {
    //     return {
    //       color: "white",
    //       fillColor: chooseColor(feature.properties.borough),
    //       fillOpacity: 0.5,
    //       weight: 1.5
    //     };
    //   }
    // }).addTo(myMap);
  
  // Create a new marker cluster group
    // var markers = L.markerClusterGroup();
    // for (var i = 0; i < response.length; i++) {

    //     // Set the data location property to a variable
    //     var location = response[i].geometry.coordinates[0];
    //     console.log(location)
    // };
     var mag = response.properties.mag;
     console.log(mag)
     
    // var depth = response.geometry.coordinates[2];


});
