const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Product title required"],
  },
  price: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    enum: ["fruit", "vegetable", "mineral", "food"],
  },
  farm: { type: Schema.Types.ObjectId, ref: "Farm" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
