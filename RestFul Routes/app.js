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
    id: 1,
    username: "monty",
    comment: "aha aha aha good.",
  },
  {
    id: 2,
    username: "aury",
    comment: "i have seen it.",
  },
  {
    id: 3,
    username: "notty",
    comment: "can you do it again.",
  },
  {
    id: 4,
    username: "jhinku",
    comment: "not all that good.",
  },
  {
    id: 5,
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

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  let comment = comments.find((c) => c.id === parseInt(id));
  res.render("comments/details", { comment });
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
