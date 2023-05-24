const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  let products = await Product.find({});
  res.render("products/list", { products });
});

app.get("/products/:id/details", async (req, res) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  res.render("products/details", { product });
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  res.render("products/update", { product });
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});

app.put("/products/:id/update", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${id}/details`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
