let map;
let markers = [];

function initMap() {
  map = L.map("map").setView([22.3193, 114.1694], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);
}

function getColor(vacancy) {
  if (vacancy === 0) return "red";
  if (vacancy < 20) return "orange";
  return "green";
}

function updateMap(carparks) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  carparks.forEach(c => {
    if (!c.latitude || !c.longitude) return;

    const color = getColor(c.vacancy);
    const marker = L.circleMarker(
      [c.latitude, c.longitude],
      { radius: 8, color }
    ).addTo(map);

    marker.bindPopup(
      `<strong>${c.name}</strong><br/>
       🚗 ${c.vacancy} spaces<br/>
       💰 ${c.parkingFee}`
    );

    markers.push(marker);
  });
}

initMap();
