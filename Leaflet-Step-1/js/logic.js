// Creating map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 2,
});

var lightmap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }
).addTo(myMap);

var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url, function(response) {
  
  //console.log(response)
  // var location = response.properties.place;
  //console.log(location)
  function style(feature) { 
    return    {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
      //fillColor: getColor(feature.geometry.coordinates[2])
    }
  }
  function getColor(depth) {
    return depth > 200 ? '#800026' :
           depth > 100  ? '#BD0026' :
           depth> 14  ? '#E31A1C' :
           depth> 9  ? '#FC4E2A' :
           depth> 8   ? '#FD8D3C' :
           depth > 5   ? '#FEB24C' :
           depth > 4   ? '#FED976' :
                         '#FFEDA0';     
       
  }  
  

  geojson = L.geoJSON(response, {
      
    style: style,

    pointToLayer: function(feature, location) {
      if (feature.properties.mag >=200)
        return L.circleMarker(location, {
            radius:100,
            opacity: .5,
            //color: "#000",
            color:getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
        }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
           else if (feature.properties.mag >=100)
           return L.circleMarker(location, {
            radius:60,
            opacity: .5,
            //color: "#000",
            color:getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
         }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
            else if (feature.properties.mag >=14)
            return L.circleMarker(location, {
            radius:45,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
            else if (feature.properties.mag >=9)
            return L.circleMarker(location, {
            radius:30,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag >=8)
            return L.circleMarker(location, {
            radius:25,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag >=5)
            return L.circleMarker(location, {
            radius:15,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag >=2)
            return L.circleMarker(location, {
            radius:8,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag === "")
            return L.circleMarker(location, {
            radius:2,
            //opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.6,
        }).bindTooltip(label, {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
    },  
    
    onEachFeature: function(feature, layer) {
    layer.bindPopup("<h4>" + feature.properties.place + 
    "</h4><hr><p>" + new Date (feature.properties.time) + "<hr>"+ 
    "Magnitude:" + feature.properties.mag + "<hr>" + "Depth:" + feature.geometry.coordinates[2] + "</p>");
    
    }
  }).addTo(myMap); 
  // geojson = L.choropleth(response, {
      
  //     // Define what  property in the features to use
  //     valueProperty: "coordinates[2]",
        
  //     // Set color scale
  //     scale: ["#ffffb2", "#b10026"],
  
  //     // Number of breaks in step range
  //     steps: 6,
  
  //     // q for quartile, e for equidistant, k for k-means
  //     mode: "q",
  //     style: {
  //       // Border color
  //       color: "#fff",
  //       weight: 1,
  //       fillOpacity: 0.8
  //     },
  //     onEachFeature: function(feature, layer) {
  //     layer.bindPopup("<h4>" + feature.properties.place + 
  //     "</h4><hr><p>" + new Date (feature.properties.time) + "<hr>"+ 
  //     "Mag:"+ feature.properties.mag + "<hr>" + feature.geometry.coordinates[2] + "</p>");
      
  //     }
  //   }).addTo(myMap);

    // let earthquakes = L.geoJSON(earthquake, {
    //   onEachFeature: onEachFeature
    // });
      // Set up the legend
    let legend = L.control({ position: "bottomright" });
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
    }
    // Adding legend to the map
    legend.addTo(myMap);
});
  
//function createMap(earthquakes) {
    // Create the tile layer that will be the background of our map
      
      // var baseMap = {
      //   "Light Map": lightmap,
      // };
      // var overlayMap = {
      //   Earthquakes: earthquakes
      // };

  
   

    //     // Set the data location property to a variable
    //     var location = response[i].geometry.coordinates[0];
    //     console.log(location)
    // };
      
    //  var mag = response.map(data => data.features.properties);
    //  console.log(mag)
     
    // var depth = response.geometry.coordinates[2]; 