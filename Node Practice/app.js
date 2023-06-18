// const fs = require("fs");
const notes = require("./notes");

// fs.writeFileSync("notes.txt", "This is a new text file created with node.");
// fs.appendFileSync("notes.txt", " This is another line of text.");

console.log(notes);

//callback function
const add = (num1, num2, callback) => {
  setTimeout(() => {
    let sum = num1 + num2;
    callback(sum);
  }, 2000);
};

add(1, 4, (sum) => {
  console.log(sum);
});