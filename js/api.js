const API_URL = "https://api.data.gov.hk/v1/carpark-info-vacancy";

async function fetchCarparks(lang = "en_US") {
  const url = `${API_URL}?data=all&vehicleTypes=privateCar&lang=${lang}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.results;
}
``
