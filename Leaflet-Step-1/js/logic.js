var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url, function(response) {
    createFeatures(response.features);

function createFeatures(earthquake) {
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h4>" + feature.properties.place + 
      "</h4><hr><p>" + new Date (feature.properties.time) + "<hr>"+ 
      "Mag:"+feature.properties.mag + "</p>");
          }
    var earthquakes = L.geoJSON(earthquake, {
      onEachFeature: onEachFeature,
      style: function(feature) {
        return {
          color: "white",
          fillColor: chooseColor(new Depth(feature.geometry.coordinates[2])),
          fillOpacity: 0.5,
          weight: 1.5
        };
      }
    });
    createMap(earthquakes);
  }
function createMap(earthquakes) {
    // Create the tile layer that will be the background of our map
      var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });
      var baseMap = {
        "Light Map": lightmap,
      };
      var overlayMap = {
        Earthquakes: earthquakes
      };
      // Creating map object
      var myMap = L.map("mapid", {
        center: [40.7128, -74.0059],
        zoom: 11,
        layers: [lightmap, earthquakes]
      });
      L.control.layers(baseMap, overlayMap, {
        collapsed: false
      }).addTo(myMap);

}
  
   

    //     // Set the data location property to a variable
    //     var location = response[i].geometry.coordinates[0];
    //     console.log(location)
    // };
      
    //  var mag = response.map(data => data.features.properties);
    //  console.log(mag)
     
    // var depth = response.geometry.coordinates[2]; 