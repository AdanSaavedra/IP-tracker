const ip = document.querySelector(".ipText");
const locationn = document.querySelector(".locationText");
const timezone = document.querySelector(".timezoneText");
const isp = document.querySelector(".ispText");

fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_a9gKZSoHOFDUzEKRrO2KCtN9cH5oE"
)
  .then((response) => response.json())
  .then((data) => {
    initMap(data.location.lat, data.location.lng);
    ip.innerHTML += `${data.ip}`;
    locationn.innerHTML += `${data.location.city}, ${data.location.country}`;
    timezone.innerHTML += `${data.location.timezone}`;
    isp.innerHTML += `${data.isp}`;
  })
  .catch((error) => console.error("Error with the location: ", error));

function initMap(latitude, longitude) {
  // Crea un mapa con Leaflet
  const map = L.map("map").setView([latitude, longitude], 20);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Añade un marcador en la ubicación del usuario
  var myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    // iconSize: [38, 95],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowAnchor: [22, 94],
  });
  L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
}
