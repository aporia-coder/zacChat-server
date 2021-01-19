const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name must not be empty"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email must not be empty"],
      trim: true,
      unique: [true],
      validate: {
        validator: (v) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password must not be empty"],
      trim: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

UsersSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("Users", UsersSchema);
