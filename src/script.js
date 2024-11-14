function changeDetails(response) {
  let tempElement = document.querySelector("#weather-app-temperature");
  let temp = Math.round(response.data.temperature.current);
  tempElement.innerHTML = temp;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);
  formatDate(date);
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = `${condition}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;
  let iconElement = document.querySelector("#weather-app-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  //call api and search city
  let apiKey = "4a38ba6a1f4e46ao3f0t9673657bc0fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
  axios.get(apiUrl).then(changeDetails);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDateELement = document.querySelector("#weather-date");
  let formattedDay = days[day];
  currentDateELement.innerHTML = `${formattedDay} ${hours}:${minutes}`;
}

formatDate(new Date());

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);
