var icone = L.icon({
  iconUrl: './marker-icon.png',
  shadowUrl: './marker-shadow.png',
  iconSize: [18, 95], // size of the icon
  shadowSize: [20, 95], // size of the shadow
  iconAnchor: [9, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 94], // the same for the shadow
  popupAnchor: [0, -79] // point from which the popup should open relative to the iconAnchor
})

function setup() {
  console.log('1.setup');
  noCanvas();


  var mymap = L.map('mapid').setView([-5, -35], 3);

  mymap.locate({
    setView: true,
    maxZoom: 16
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZW5pdmFsZG9iIiwiYSI6ImNrNWl2YjZnZTBpb3Qzbm1tMHU4YzU0MzEifQ.IoTXc75a2cXUCL11w5RAow'
  }).addTo(mymap);


  L.marker([-5.759290, -35.368370], {
      icon: icone
    }).addTo(mymap)
    .bindPopup('AEROPORTO  <BR> dia 14 17:20')
    .openPopup();

  // Clicando no mapa

  function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
  }

  mymap.on('click', onMapClick);

  //localizando usuário

  function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  mymap.on('locationfound', onLocationFound);
  
  //se houver erro de localização
  
  function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);


} //setup