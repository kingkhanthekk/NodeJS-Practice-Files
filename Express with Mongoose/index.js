const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://127.0.0.1:27017/productsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Connection error ", e);
  });

app.get("/products", async (req, res) => {
  let products = await Product.find({});
  res.render("products/list", { products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  res.render("products/details", { product });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
