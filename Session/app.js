const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({ secret: "thisisasecret" }));

app.get("/pagecount", (req, res) => {
  if (req.session.count) req.session.count += 1;
  else req.session.count = 1;
  res.send(`You have viewed this route ${req.session.count} times.`);
});

app.listen(3000, () => {
  console.log("Runnings");
});
