const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/movieList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Connection error", e);
  });

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  year: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    default: 1,
    min: 0,
  },
  rating: {
    type: String,
    maxlength: 20,
  },
  comments: [String],
});

const Movie = mongoose.model("Movie", movieSchema);
const inception = new Movie({
  title: "Inception",
  year: 2010,
  score: 8.7,
  rating: "Good",
});
// inception.save();  //Inserts a single document

// Movie.insertMany([
//   { title: "Django Unchained", year: 2012, score: 8.9, rating: "Good" },
//   { title: "OldBoy", year: 2001, score: 7.4, rating: "Not good" },
//   { title: "Man of Steel", year: 2012, score: 8.9, rating: "Good" },
//   { title: "Avengers", year: 2010, score: 8.6, rating: "Good" },
// ]).then((data) => {
//   console.log("Inserted: ", data);
// });

//Inserts many documents at a time

// Movie.find({}).then((data) => {
//   console.log(data);
// });

//Shows all data in a collection

// Movie.find({ year: { $gte: 2010 } }).then((data) => {
//   console.log(data);
// });

//Selected data in a collection

// Movie.findById("646a3ba632d33b25e4be5382").then((data) => console.log(data));

//Finds a document by its id.

// Movie.updateOne({ title: "OldBoy" }, { year: 2003 }).then((m) =>
//   console.log(m)
// );

// Updates one document

// Movie.updateMany(
//   { title: { $in: ["Man of Steel", "Avengers"] } },
//   { rating: "very good" }
// ).then((m) => console.log(m));

//Updates many documents

// Movie.findOneAndUpdate(
//   { title: "Inception" },
//   { rating: "very good", score: 9.1 },
//   { new: true, runValidators: true }
// ).then((m) => console.log(m));

//Finds one document and upsates it

// Movie.deleteOne({ title: "OldBoy" }).then((m) => console.log(m));

// Deletes one document

// Movie.deleteMany({ year: { $gte: 2010 } }).then((m) => console.log(m));

// Deletes many document

// Movie.findOneAndDelete({ title: "Avengers" }).then((m) => console.log(m));

// Finds one and deletes it
