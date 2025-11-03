const apiKey = "e0f665307d348c89b1e8ae9f48c51619";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

searchBtn.addEventListener("click", getWeather);

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name!");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404" || data.cod === 404) {
        alert("City not found!");
        return;
      }

      document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `🌡 ${data.main.temp}°C`;
      document.getElementById("description").textContent = `${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherInfo.classList.remove("hidden");
    })
    .catch(error => {
      alert("Error fetching weather data.");
      console.error(error);
    });
}
