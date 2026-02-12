const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryControllers");

const router = express.Router();

//Routes
//Add inventory || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//GET all records || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
