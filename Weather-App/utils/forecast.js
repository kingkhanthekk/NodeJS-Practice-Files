const axios = require("axios");

const forecast = async (location, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=8e1a111e9180448f80a122903231706&q=${location}&aqi=no`;
  try {
    const res = await axios.get(url);
    const weatherData = res.data;
    const data = {
      location: weatherData.location.name,
      condition: weatherData.current.condition.text,
      temperature: weatherData.current.temp_c,
      feels_like: weatherData.current.feelslike_c,
    };
    callback(undefined, data);
  } catch (e) {
    callback("Network connection error!", undefined);
  }
};

module.exports = forecast;
