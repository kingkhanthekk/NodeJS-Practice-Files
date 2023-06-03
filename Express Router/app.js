const express = require("express");
const app = express();
const catsRoutes = require("./routers/cats");
const dogsRoutes = require("./routers/dogs");
const secretRoutes = require("./routers/secret");

app.use("/cats", catsRoutes);
app.use("/dogs", dogsRoutes);
app.use("/secret", secretRoutes);

app.listen(3000, () => {
  console.log("Running");
});
