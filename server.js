const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const socket = require("socket.io");
const app = express();
const port = process.env.PORT || 5000;

// Server connection
const server = app.listen(port, () => {
  console.log(`Connected to Server on port ${port}`);
});

// Database connection
const connection = mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to Database");
  },
);

// Middleware / Routes
app.use(express.json());
app.use(express.static(__dirname + "/api/public"));
app.use("/api/users", require("./routes/users"));

// Socket setup
const io = socket(server);

io.on("connection", (socket) => {
  socket.on("add-user", (user) => {
    socket.broadcast.emit("add-user", user);
  });

  socket.on("show-users", (users) => {
    io.sockets.emit("show-users", users);
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
