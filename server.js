const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
const app = express();
const port = process.env.PORT || 5000;

// Server connection
const server = app.listen(port, () => {
  console.log(`Connected to Server on port ${port}`);
});

app.use(express.static(__dirname + "/public"));

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  socket.on("add-user", (user) => {
    io.sockets.emit("add-user", user);
    console.log(`${user} has connected`);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("chat-message", (msg) => {
    io.sockets.emit("chat-message", msg);
  });

  // socket.on("disconnect", (user) => {
  //   console.log(`${user} has disconnected`);
  //   io.sockets.emit("chat-message", user);
  // });
});

// todo
// emit new users on active user list
// have to dispatch actions with types ?
