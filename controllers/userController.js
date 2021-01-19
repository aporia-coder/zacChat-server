const User = require("../models/Users");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.create({
      userName: userName.toLowerCase(),
      email,
      password,
    });
    user.save();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
