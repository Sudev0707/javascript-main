// src/api.js
const API_KEY = "2b4c24429a56e55f777cb903095bc553";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get Weather by city name
export const getWeatherByCity = async (city) => {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
    
  } catch (err) {
    console.error("Error fetching weather by city:", err);
    throw err;
  }
};

// Get Weather by latitude & longitude
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;

  } catch (err) {
    console.error("Error fetching weather by coords:", err);
    throw err;
  }
};

// Get Air Quality
export const getAirQuality = async (lat, lon) => {
  try {
    const res = await fetch(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await res.json();
    return data.list[0];

  } catch (err) {
    console.error("Error fetching air quality:", err);
    throw err;
  }
};
