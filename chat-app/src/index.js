const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("welcomeMessage", generateMessage("Welcome!"));

  socket.broadcast.emit(
    "welcomeMessage",
    generateMessage("A new user has joined!")
  );

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }

    io.emit("welcomeMessage", generateMessage(message));

    callback();
  });

  socket.on("disconnect", () => {
    io.emit("welcomeMessage", generateMessage("A user had left!"));
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    socket.broadcast.emit(
      "sendLocation",
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
