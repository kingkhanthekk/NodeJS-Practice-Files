const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

const text = process.argv[2];
let shortLang = franc(text);

if (shortLang === "und") {
  console.log("Unable to detect language. Try again!!".red);
} else {
  let language = langs.where("3", shortLang);
  console.log(`I think the language is: ${language.name}`.green);
}
