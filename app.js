const API =
  "https://api.data.gov.hk/v1/carpark-info-vacancy?data=info,vacancy&vehicleTypes=privateCar&lang=en_US";

let map = L.map("map").setView([22.3193, 114.1694], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

let markers = [];

fetch(API)
  .then((res) => res.json())
  .then((data) => {
    render(data);
  });

function render(carparks) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  carparks.forEach((cp) => {
    if (!cp.latitude || !cp.longitude) return;

    let vacancy =
      cp.privateCar?.vacancy?.[0]?.vacancy ?? null;

    let statusClass = "gray";
    let statusText = "No real-time data";

    if (vacancy !== null) {
      if (vacancy > 30) {
        statusClass = "green";
        statusText = `${vacancy} spaces`;
      } else if (vacancy > 0) {
        statusClass = "yellow";
        statusText = `${vacancy} spaces`;
      } else {
        statusClass = "red";
        statusText = "Full";
      }
    }

    // Marker
    let marker = L.marker([cp.latitude, cp.longitude])
      .addTo(map)
      .bindPopup(`
        <strong>${cp.name}</strong><br>
        💰 ${cp.privateCar?.charge ?? "N/A"}<br>
        🚗 ${statusText}
      `);

    markers.push(marker);

    // List item
    let div = document.createElement("div");
    div.className = "carpark";
    div.innerHTML = `
      <strong>${cp.name}</strong><br>
      <span class="status ${statusClass}">${statusText}</span>
    `;

    div.onclick = () => {
      map.setView([cp.latitude, cp.longitude], 16);
      marker.openPopup();
    };

    list.appendChild(div);
  });
}
