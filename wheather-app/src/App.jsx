import { useEffect, useState } from "react";
import "./App.css";
import "./style/style.css";
import {
  getWeatherByCity,
  getWeatherByCoords,
  getAirQuality,
} from "./apis/api"; 

function App() {
  const [city, setCity] = useState("kolkata");
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [msg, setMessage] = useState("");

  //
  const mainWeather = weather.weather[0].main.toLowerCase();
  if (["rain", "drizzle", "thunderstorm"].includes(mainWeather)) {
    // Show rain alert
    console.log("🌧️ It's raining!");
  }

  const handleSearch = async () => {
    try {
      const data = await getWeatherByCity(city);
      if (data.cod === 200) {
        setWeather(data);
        console.log(data);

        setAir(await getAirQuality(data.coord.lat, data.coord.lon));
      } else {
        setMessage("City not found");
        setWeather(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByCoords(latitude, longitude);
          setWeather(weatherData);
          const airData = await getAirQuality(latitude, longitude);
          setAir(airData);
        },
        () => alert("Could not get your location. Please enter a city.")
      );
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="header">
            {/* <h2>Hello React Weather</h2> */}
            <div className="search-box">
              <input
                type="text"
                className="input-box"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div className="weather-body">
            <div className="weather-box">
              <p className="temperature">
                {weather ? Math.round(weather.main.temp) : "--"} <sup>°C</sup>
              </p>
              <p className="description">
                {weather ? weather.weather[0].description : "N/A"}
              </p>
              {weather &&
                weather.weather[0].main.toLowerCase().includes("rain") && (
                  <div className="rain-alert">
                    🌧️ It's raining, don’t forget your umbrella!
                  </div>
                )}
            </div>

            <div className="weather-detail">
              <div className="humidity">
                <i className="fa-solid fa-droplet"></i>
                <div className="text">
                  <span>{weather ? weather.main.humidity : "--"}%</span>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <i className="fa-solid fa-wind"></i>
                <div className="text">
                  {/* <span>{weather ? weather.wind.speed : "--"} km/h</span> */}
                  {/* <span>{Math.round(weather.wind.speed * 3.6)} km/h</span> */}
                  <span>
                    {weather ? (weather.wind.speed * 2.23694).toFixed(1) : "--"}{" "}
                    mph
                  </span>

                  <p>Wind</p>
                </div>
              </div>

              <div className="feels-like">
                <i className="fa-solid fa-temperature-half"></i>
                <div className="text">
                  <span>
                    {weather ? Math.round(weather.main.feels_like) : "--"} °C
                  </span>
                  <p>Feels Like</p>
                </div>
              </div>

              <div className="pressure">
                <i className="fa-solid fa-gauge"></i>
                <div className="text">
                  <span>{weather ? weather.main.pressure : "--"} hPa</span>
                  <p>Pressure</p>
                </div>
              </div>

              <div className="visibility">
                <i className="fa-solid fa-eye"></i>
                <div className="text">
                  <span>{weather ? weather.visibility / 1000 : "--"} km</span>
                  <p>Visibility</p>
                </div>
              </div>

              {air && (
                <div className="air-quality">
                  <i className="fa-solid fa-wind"></i>
                  <div className="text">
                    <span>AQI: {air.main.aqi}</span>
                    <p>PM2.5: {air.components.pm2_5} µg/m³</p>
                    <p>PM10: {air.components.pm10} µg/m³</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
