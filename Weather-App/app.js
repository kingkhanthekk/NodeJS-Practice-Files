const express = require("express");
const app = express();
const forecast = require("./utils/forecast");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { data: undefined });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", (req, res) => {
  const { location } = req.body;
  if (!location) {
    const err = "You must provide a location.";
    return res.render("error", { err });
  }

  forecast(
    location,
    (err, { location, condition, temperature, feels_like } = {}) => {
      if (err) {
        res.render("error", { err });
      } else {
        const data = {
          location,
          condition,
          temperature,
          feels_like,
          err: "",
        };
        res.render("home", { data });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
