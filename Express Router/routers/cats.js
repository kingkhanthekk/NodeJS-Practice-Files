const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All cats");
});

router.get("/:id", (req, res) => {
  res.send("Particular cat");
});

router.get("/:id/new", (req, res) => {
  res.send("New cat");
});

module.exports = router;
