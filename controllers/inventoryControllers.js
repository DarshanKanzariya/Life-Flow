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

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const hospital = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            hospital,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            hospital,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
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
      .find({ hospital: req.userId })
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
