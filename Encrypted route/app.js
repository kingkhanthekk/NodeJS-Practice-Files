const express = require("express");

const app = express();

const verify = (req, res, next) => {
  const { password } = req.query;
  if (password === "gulumulu") next();
  res.send("You have to include corret password.");
};

app.get("/secret", verify, (req, res) => {
  res.send("My secret is I feel so lonely all the time.");
});

app.listen(3000, () => {
  console.log("Running");
});
