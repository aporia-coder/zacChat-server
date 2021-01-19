const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: false,
      trim: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Message", MessagesSchema);
