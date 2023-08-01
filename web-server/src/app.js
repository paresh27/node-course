const path = require("path");
const express = require("express");

// console.log(__dirname); ///var/www/html/node-course/web-server/src
// console.log(__filename); ///var/www/html/node-course/web-server/src/app.js
// console.log(path.join(__dirname, "../public")); ///var/www/html/node-course/web-server/public

const publicDirectoryPath = path.join(__dirname, "../public");

const app = express();

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Paresh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Paresh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Paresh",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "forecast",
    location: "location",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
