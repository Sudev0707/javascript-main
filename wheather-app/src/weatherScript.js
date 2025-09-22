const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
// const weather_img = document.querySelector("");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
  console.log('clickedd')
});

async function checkWeather(city) {
  const api_key = "2b4c24429a56e55f777cb903095bc553";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weatherData = await fetch(`${url}`).then((response) => response.json());

  console.log(weatherData);
  
}

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
