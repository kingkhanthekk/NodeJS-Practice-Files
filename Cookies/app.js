const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("mysign"));

app.get("/setcookies", (req, res) => {
  res.cookie("name", "jhinku");
  res.cookie("secret", "ula la la", { signed: true });
  res.send("Added cookies");
});

app.get("/getcookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/getsignedcookies", (req, res) => {
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log("Running");
});
