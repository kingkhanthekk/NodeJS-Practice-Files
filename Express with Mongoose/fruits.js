const mongoose = require("mongoose");
const Product = require("./models/products");

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

// let product = new Product({
//   title: "Mango",
//   price: 7,
//   stock: 20,
//   category: "fruit",
// });

// product.save();

// let fruits = [
//   {
//     title: "Orange",
//     price: 5,
//     stock: 25,
//     category: "fruit",
//   },
//   {
//     title: "Guava",
//     price: 4,
//     stock: 30,
//     category: "fruit",
//   },
//   {
//     title: "Water Melon",
//     price: 15,
//     stock: 10,
//     category: "fruit",
//   },
//   {
//     title: "Grape",
//     price: 12,
//     stock: 15,
//     category: "fruit",
//   },
// ];

// Product.insertMany(fruits);
