const express = require("express");
const {
  loginController,
  registerController
} = require("../controllers/authController");

const router = express.Router();

//routes
// register user || POST
router.post("/register", registerController);

// login user || POST
router.post("/login", loginController);

module.exports = router;
