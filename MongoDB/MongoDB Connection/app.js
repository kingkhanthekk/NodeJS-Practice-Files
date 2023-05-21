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
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
const inception = new Movie({
  title: "Inception",
  year: 2010,
  score: 8.7,
  rating: "Good",
});
inception.save();
