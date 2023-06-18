const axios = require("axios");
const forecast = require("./utils/forecast");

forecast("Riyadh", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      `The current condition in ${data.location} is ${data.condition}, and temperature is ${data.temperature} degree celcius. Feels like ${data.feels_like} degree celcius.`
    );
  }
});
