const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const app = express();
const port = process.env.PORT || 5000;

// Server connection
const server = app.listen(port, () => {
  console.log(`Connected to Server on port ${port}`);
});

// Connecting to database
mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to Database");
  },
);

// Socket setup
const io = socket(server);
io.on("connection", (socket) => {
  console.log("Made socket connection");

  // Sending message
  socket.on("chat-message", (msg) => {
    console.log(msg);
  });

  // On disconnect
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});
