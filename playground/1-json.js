const fs = require("fs");

// const book = {
//   title: "Book one",
//   author: "Author one",
// };

// const bookJson = JSON.stringify(book); //returns a string
// fs.writeFileSync("1-json.json", bookJson);

// const dataBuffer = fs.readFileSync("1-json.json"); //returns buffer
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data, data.title);

const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = "Raj";
data.age = 30;

const modifiedData = JSON.stringify(data);
fs.writeFileSync("1-json.json", modifiedData);
