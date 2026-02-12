const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
//CREATE INVENTORY CONTROLLER
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //Validation
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }
    if (inventoryType === "in" && user.role !== "donor") {
      throw new Error("Not a donor account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital account");
    }
    //Save Record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Inventory Item",
      error,
    });
  }
};

//GET All Blood Records

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ hospital: req.body.userId })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get All Records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Records",
      error,
    });
  }
};

module.exports = { createInventoryController, getInventoryController };
