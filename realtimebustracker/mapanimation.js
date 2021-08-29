mapboxgl.accessToken='pk.eyJ1IjoidGVzdHVzZXIxMDAwIiwiYSI6ImNraDkzZ2pkMzAzMHoycnBmMXpvZ3UwZnMifQ.jAE4YsPeAJv50VK92NSpOQ';

let markers = [];

async function run() {
  let busLocations = await getBusLocations();
  updateMarkers(busLocations);
  setTimeout(run, 15000); //space out requests so don't get banned
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
}

// create the map object using mapboxgl.map() function
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

function updateMarkers(locations) {
  for (let i = 0; i < locations.length; i++) {
    let busMarker = locations[i].attributes;
    busMarker.color = 'blue';
    busMarker.rotation = 135;
    busMarker.markerNumber = i;
    busMarker.anchor = 'center';
    if (busMarker.direction_id > 0) {
      busMarker.color = 'black';
      busMarker.rotation = -22.5;
    }
  
    if (markers[i]) removeMarker(markers[i]);
    markers[i] = addMarker(busMarker);
  };
}

function addMarker(busMarker) {
  let loc = [busMarker.longitude, busMarker.latitude];
  let marker = new mapboxgl.Marker({color: busMarker.color, anchor: busMarker.anchor}).setLngLat(loc).setRotation(busMarker.rotation).addTo(map);
  return marker;
}

function removeMarker(busMarker) {
  busMarker.remove()
}

run();
