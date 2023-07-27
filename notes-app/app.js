const myNotes = require("./notes.js");
const chalk = require("chalk");

console.log(myNotes());

console.log(chalk.green.bold.inverse("Success!!"));
