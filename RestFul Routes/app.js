const { urlencoded } = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let comments = [
  {
    username: "monty",
    comment: "aha aha aha good.",
  },
  {
    username: "aury",
    comment: "i have seen it.",
  },
  {
    username: "notty",
    comment: "can you do it again.",
  },
  {
    username: "jhinku",
    comment: "not all that good.",
  },
  {
    username: "shukku",
    comment: "tere bin ghorib.",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  let newComment = {
    username: username,
    comment: comment,
  };
  comments.push(newComment);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
