let currentLang = "en_US";
let allCarparks = [];

function renderList(carparks) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  carparks.forEach(c => {
    const div = document.createElement("div");
    div.className = "carpark";

    const color = getColor(c.vacancy);

    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>💰 ${c.parkingFee || "-"}</p>
      <p class="vacancy ${color}">🚗 ${c.vacancy} spaces</p>
    `;
    list.appendChild(div);
  });
}

function populateDistrictFilter(carparks) {
  const select = document.getElementById("districtFilter");
  const districts = [...new Set(carparks.map(c => c.district).filter(Boolean))];

  select.innerHTML = `<option value="">All Districts</option>`;
  districts.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    select.appendChild(opt);
  });
}

document.getElementById("districtFilter").addEventListener("change", e => {
  const district = e.target.value;
  const filtered = district
    ? allCarparks.filter(c => c.district === district)
    : allCarparks;

  renderList(filtered);
  updateMap(filtered);
});

document.getElementById("langSelect").addEventListener("change", async e => {
  currentLang = e.target.value;
  await loadData();
});
