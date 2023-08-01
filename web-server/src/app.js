const path = require("path");
const express = require("express");

// console.log(__dirname); ///var/www/html/node-course/web-server/src
// console.log(__filename); ///var/www/html/node-course/web-server/src/app.js
// console.log(path.join(__dirname, "../public")); ///var/www/html/node-course/web-server/public

const publicDirectoryPath = path.join(__dirname, "../public");

const app = express();

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "forecast",
    location: "location",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
