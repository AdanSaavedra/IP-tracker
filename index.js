//Variables
const ipp = document.querySelector(".ipText");
const locationn = document.querySelector(".locationText");
const timezone = document.querySelector(".timezoneText");
const isp = document.querySelector(".ispText");
let ipForm = document.getElementById("ipForm");
var map;
var tileLayer = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
  {
    foo: "bar",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

//Using the API and printing the data obtained
fetch(
  "https://api.ipgeolocation.io/ipgeo?apiKey=208f5ca499974e30a1231096d09001fc"
)
  .then((response) => response.json())
  .then((data) => {
    printData(data);
  })
  .catch((error) => console.error("Error with the location: ", error));

ipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newIp = document.getElementById("newIp").value;
  searchIp(newIp);
});

//Functions
function initMap(latitude, longitude) {
  //Verifying if map is started
  if (map) {
    map.setView([latitude, longitude], 17);
  } else {
    map = L.map("map").setView([latitude, longitude], 17);
  }
  tileLayer.addTo(map);

  var myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowAnchor: [22, 94],
  });
  L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
}

const searchIp = (ip) => {
  map.removeLayer(tileLayer);
  fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=208f5ca499974e30a1231096d09001fc&ip=${ip}`
  )
    .then((response) => response.json())
    .then((data) => {
      printData(data);
    })
    .catch((error) => console.error("Error with the location: ", error));
};

const printData = (data) => {
  initMap(data.latitude, data.longitude);
  ipp.innerHTML = `${data.ip}`;
  locationn.innerHTML = `${data.city}, ${data.country_capital}`;
  timezone.innerHTML = `UTC ${data.time_zone.offset}:00`;
  isp.innerHTML = `${data.isp}`;
};
