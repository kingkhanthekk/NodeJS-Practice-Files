const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Connection error", e);
  });

const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
});

const dealerSchema = new Schema({
  name: String,
  location: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
const Dealer = mongoose.model("Dealer", dealerSchema);

// Product.insertMany([
//   {
//     name: "Apple",
//     price: 5,
//     stock: 50,
//   },
//   {
//     name: "Orange",
//     price: 7,
//     stock: 50,
//   },
//   {
//     name: "Grapes",
//     price: 10,
//     stock: 40,
//   },
// ]);

const addDealer = async () => {
  const product = await Product.findOne({ name: "Apple" });
  const dealer = new Dealer({
    name: "Hanif",
    location: "Hazratpur",
  });
  dealer.products.push(product);
  await dealer.save();
};
// addDealer();
const addProduct = async () => {
  const dealer = await Dealer.findOne({ name: "Hanif" });
  const product = await Product.findOne({ name: "Grapes" });
  dealer.products.push(product);
  await dealer.save();
};
// addProduct();

// Populate products of a dealer

Dealer.findOne({ name: "Hanif" })
  .populate("products")
  .then((data) => {
    console.log(data);
  });

// mongoose.connection.close();
