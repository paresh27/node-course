const fs = require("fs"); //loading the fs module; it is build into node

fs.writeFileSync("notes.txt", "My name is paresh maheshwari.");
fs.appendFileSync("notes.txt", "I am learning Node.js");
