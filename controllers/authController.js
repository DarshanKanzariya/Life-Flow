const userModel = require("../models/userModel");
const bcrypt = require ('bcryptjs');

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        message: "User Already Exists",
        success: false,
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //save user
    const User = new userModel(req.body);
    await User.save();
    return res.status(201).send({
      message: "User Registered Successfully",
      success: true,
      user: User,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Registering User",
      success: false,
    });
  }
};

module.exports = registerController;
