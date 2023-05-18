const express = require("express");
const path = require("path");

const fakeData = require("./data.json");
const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/r/:subreddit", (req, res) => {
  let { subreddit } = req.params;
  let data = fakeData[subreddit];
  if (data) {
    res.render("index", { ...data });
  } else {
    res.render("unavailable", { subreddit });
  }
});

app.listen(3000, () => {
  console.log("Running server on port 3000.");
});
