const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Product = require("./models/product");
const Farm = require("./models/farm");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://127.0.0.1:27017/shopDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Connection error", e);
  });

let categories = ["fruit", "vegetable", "mineral", "food"];

// Farms views

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/list", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.get("/farms/:id/details", async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate("products");
  res.render("farms/details", { farm });
});

app.get("/farms/:id/products/new", async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render("products/new", { farm, categories });
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms");
});

app.post("/farms/:id/products", async (req, res) => {
  const { id } = req.params;
  const { title, price, category } = req.body;
  const product = new Product({ title, price, category });
  const farm = await Farm.findById(id);
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}/details`);
});

app.delete("/farms/:id", async (req, res) => {
  const { id } = req.params;
  await Farm.findByIdAndDelete(id);
  res.redirect("/farms");
});

// Product views

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    var products = await Product.find({ category });
    res.render("products/list", { products, category });
  } else {
    var products = await Product.find({});
    res.render("products/list", { products, category: "All" });
  }
});

app.get("/products/:id/details", async (req, res) => {
  const { id } = req.params;
  var product = await Product.findById(id).populate("farm");
  res.render("products/details", { product });
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  var product = await Product.findById(id);
  res.render("products/update", { product, categories });
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${id}/details`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
