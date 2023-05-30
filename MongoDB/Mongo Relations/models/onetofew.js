const mongoose = require("mongoose");

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

const onetofewSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  address: [
    {
      _id: false,
      street: String,
      city: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", onetofewSchema);

// One to few Relation

const user = new User({
  fname: "Abul",
  lname: "Kalam",
  address: [
    {
      street: "Hazratput",
      city: "Dhaka",
      country: "Bangladesh",
    },
  ],
});

// user.save().then((data) => {
//   console.log(data);
// });

const addAddress = async (id) => {
  const addr = {
    street: "Kazikandi",
    city: "Dhaka",
    country: "BD",
  };
  const user = await User.findById(id);
  console.log(user.address);
  user.address.push(addr);
  await user.save();
};
// addAddress("6475d667e2b6f0da64d02f3a");
