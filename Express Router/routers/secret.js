const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isSecret) next();
  else res.send("You don't have permission.");
});

router.get("/", (req, res) => {
  res.send("This is my punga secret.");
});

module.exports = router;
