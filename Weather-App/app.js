const axios = require("axios");

const url =
  "http://api.weatherapi.com/v1/current.json?key=8e1a111e9180448f80a122903231706&q=Riyadh&aqi=no";

const data = async () => {
  const res = await axios.get(url);
  console.log(res.data);
};

data();
