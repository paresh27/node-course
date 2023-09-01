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

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }

    io.to(user.room).emit(
      "welcomeMessage",
      generateMessage(message, user.username)
    );

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "welcomeMessage",
        generateMessage(`${user.username} has left the chat!`, "Admin")
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit(
        "sendLocation",
        generateLocationMessage(
          `https://google.com/maps?q=${latitude},${longitude}`,
          user.username
        )
      );
    callback();
  });

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    console.log(user);
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    //socket.emit io.emit, socket.broadcast.emit
    //io.emit, socket.broadcast.to.emit
    socket.emit("welcomeMessage", generateMessage("Welcome!", "Admin"));

    socket.broadcast
      .to(user.room)
      .emit(
        "welcomeMessage",
        generateMessage(`${user.username} has joined!`, "Admin")
      );

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });
});

server.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
