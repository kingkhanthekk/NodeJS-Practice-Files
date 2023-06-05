const express = require("express");
const app = express();
const User = require("./models/user");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "thisisasecret" }));

const requireLogin = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

mongoose
  .connect("mongodb://127.0.0.1:27017/authDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Connection error", e);
  });

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/secret", requireLogin, (req, res) => {
  // if (!req.session.userId) return res.redirect("/login");
  res.render("secret");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  req.session.userId = user._id;
  res.redirect("/secret");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const auth = await User.authenticate(username, password);
  if (auth) {
    req.session.userId = auth._id;
    res.redirect("/secret");
  } else res.redirect("/login");
});

app.post("/signout", (req, res) => {
  // req.session.userId = null;
  req.session.destroy();
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Running");
});
