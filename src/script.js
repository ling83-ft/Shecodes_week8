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
  getForecast(response.data.city);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = city;

  //call api and search city
  let apiKey = "4a38ba6a1f4e46ao3f0t9673657bc0fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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

function getForecast(city) {
  //call api and search city
  let apiKey = "4a38ba6a1f4e46ao3f0t9673657bc0fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}" /></div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
      </div>
  </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Paris");
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
