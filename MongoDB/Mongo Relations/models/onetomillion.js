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

const userSchema = new Schema({
  username: String,
  sex: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const user = new User({
  username: "kingkhan",
  sex: "male",
  age: 25,
});
// user.save();

const addTweet = async () => {
  const user = await User.findOne({ username: "kingkhan" });
  const tweet = new Tweet({
    text: "Tere bin ghorib",
    likes: 400,
  });
  tweet.user = user;
  await tweet.save();
};

// addTweet();

const populateTweet = async () => {
  await Tweet.find({})
    .populate("user")
    .then((data) => console.log(data));
};
populateTweet();
