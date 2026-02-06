const express = require("express");
const {
  loginController,
  registerController,
  currentUserController
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
// register user || POST
router.post("/register", registerController);

// login user || POST
router.post("/login", loginController);

//get current user || GET
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
