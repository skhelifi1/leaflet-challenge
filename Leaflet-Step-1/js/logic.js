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
           depth > 2   ? '#FED976' :
                         '#FFEDA0';     
       
  }  
  

  geojson = L.geoJSON(response, {
      
    style: style,

    pointToLayer: function(feature, location) {
      if (feature.properties.mag >=200)
        return L.circleMarker(location, {
            radius:500,
            opacity: .5,
            //color: "#000",
            color:getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
        }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
           else if (feature.properties.mag >=100)
           return L.circleMarker(location, {
            radius:250,
            opacity: .5,
            //color: "#000",
            color:getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
         }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
            else if (feature.properties.mag >=14)
            return L.circleMarker(location, {
            radius:120,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip(); 
            else if (feature.properties.mag >=9)
            return L.circleMarker(location, {
            radius:90,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag >=8)
            return L.circleMarker(location, {
            radius:50,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag >=5)
            return L.circleMarker(location, {
            radius:30,
            opacity: .5,
            //color: "#000",
            color: getColor(feature.geometry.coordinates[2]),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.8
          }).bindTooltip( {permanent: false, direction: "top", className: "my-labels"}).openTooltip();
            else if (feature.properties.mag >=2)
            return L.circleMarker(location, {
            radius:10,
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
  
      // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function(myMap) {
      var div = L.DomUtil.create("div", "legend");
      var categories = [200,100,14,9,8,5,2];
      // var colors = geojson.fillColor;
      var labels = [];

      
      var legendInfo = "<h4>Earthquake Depth</h4>"; 
        // "<div class=\"labels\">" +
          // "<div class=\"categories\">" + categories + "</div>" +
          // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        // "</div>";

      div.innerHTML = legendInfo;

      categories.forEach(category => {
        labels.push("<li style=\"background-color: " + getColor(category) + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    }
    // Adding legend to the map
    legend.addTo(myMap);
});

