const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const { createUser, getUsers } = require("../controllers/userController");

router.route("/").get(getUsers);
router.route("/signup").post(createUser);

module.exports = router;
