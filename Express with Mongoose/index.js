const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/products");
const path = require("path");
const methodOverride = require("method-override");
const AppError = require("./AppError");

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

let categories = ["fruit", "vegetable", "mineral", "food"];

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    let products = await Product.find({ category });
    if (!products) {
      return next(new AppError(404, "No products found"));
    }
    res.render("products/list", { products, category });
  } else {
    let products = await Product.find({});
    if (!products) {
      return next(new AppError(404, "No products found"));
    }
    res.render("products/list", { products, category: "All" });
  }
});

app.get("/products/:id/details", async (req, res) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  if (!product) {
    return next(new AppError(404, "Product not found"));
  }
  res.render("products/details", { product });
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  let product = await Product.findById(id);
  if (!product) {
    return next(new AppError(404, "Product not found"));
  }
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

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong." } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
