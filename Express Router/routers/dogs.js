const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All dogs");
});

router.get("/:id", (req, res) => {
  res.send("Particular dog");
});

router.get("/:id/new", (req, res) => {
  res.send("New dog");
});

module.exports = router;
