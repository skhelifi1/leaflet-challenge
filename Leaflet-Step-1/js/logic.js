// Creating map object
var myMap = L.map("mapid", {
  center: [40.7128, -74.0059],
  zoom: 11,
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
}).addTo(myMap);

var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url, function(response) {
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "coordinates",
  
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
  
      // Number of breaks in step range
      steps: 6,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function(feature, layer) {
      layer.bindPopup("<h4>" + feature.properties.place + 
      "</h4><hr><p>" + new Date (feature.properties.time) + "<hr>"+ 
      "Mag:"+ feature.properties.mag + "<hr>" + feature.geometry.coordinates[2] + "</p>");
      
      }.addTo(myMap);

    let earthquakes = L.geoJSON(earthquake, {
      onEachFeature: onEachFeature
    }),
      // Set up the legend
    let legend = L.control({ position: "bottomright" }),
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h1>Earthquake Depth</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;

    // Adding legend to the map
    legend.addTo(myMap);
    //createMap(earthquakes);
    }
  
//function createMap(earthquakes) {
    // Create the tile layer that will be the background of our map
      
      // var baseMap = {
      //   "Light Map": lightmap,
      // };
      // var overlayMap = {
      //   Earthquakes: earthquakes
      // };
      
      

}
  
   

    //     // Set the data location property to a variable
    //     var location = response[i].geometry.coordinates[0];
    //     console.log(location)
    // };
      
    //  var mag = response.map(data => data.features.properties);
    //  console.log(mag)
     
    // var depth = response.geometry.coordinates[2]; 