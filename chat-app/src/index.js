const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let message = "Welcome!";
io.on("connection", (socket) => {
  socket.emit("welcomeMessage", message);

  socket.broadcast.emit("welcomeMessage", "A new user has joined!");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }

    io.emit("welcomeMessage", message);

    callback();
  });

  socket.on("disconnect", () => {
    io.emit("welcomeMessage", "A user had left!");
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    // console.log("sendLocation", latitude, longitude);
    socket.broadcast.emit(
      "sendLocation",
      `https://google.com/maps?q=${latitude},${longitude}`
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
