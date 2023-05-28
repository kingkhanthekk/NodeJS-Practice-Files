const express = require("express");
const AppError = require("./AppError");

const app = express();

const verify = (req, res, next) => {
  const { password } = req.query;
  if (password === "gulumulu") next();
  throw new AppError(401, "You require password.");
  // res.send("You have to include corret password.");
};

app.get("/secret", verify, (req, res) => {
  res.send("My secret is I feel so lonely all the time.");
});

app.get("/error", (req, res) => {
  jhinku.go();
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong." } = err;
  console.log(err);
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Running");
});
