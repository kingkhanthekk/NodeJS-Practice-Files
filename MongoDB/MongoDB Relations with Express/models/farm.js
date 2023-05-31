const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product");

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm name required."],
  },
  location: String,
  email: {
    type: String,
    required: [true, "Email needed."],
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

farmSchema.post("findOneAndDelete", async (farm) => {
  await Product.deleteMany({ _id: { $in: farm.products } });
});

module.exports = mongoose.model("Farm", farmSchema);
