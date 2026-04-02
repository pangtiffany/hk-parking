async function loadData() {
  allCarparks = await fetchCarparks(currentLang);

  renderList(allCarparks);
  updateMap(allCarparks);
  populateDistrictFilter(allCarparks);
}

document.getElementById("nearMeBtn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(pos => {
    map.setView(
      [pos.coords.latitude, pos.coords.longitude],
      15
    );
  });
});

// Initial load
loadData();

// Auto refresh every 60 seconds
setInterval(loadData, 60000);
