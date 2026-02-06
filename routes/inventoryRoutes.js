const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
} = require("../controllers/inventoryControllers");

const router = express.Router();

//Routes
//Add inventory || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

module.exports = router;
