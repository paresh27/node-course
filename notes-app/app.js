const myNotes = require("./notes.js");
const validator = require("validator");

console.log(myNotes());

console.log(validator.isEmail("123"));
console.log(validator.isEmail("test@test.com"));
