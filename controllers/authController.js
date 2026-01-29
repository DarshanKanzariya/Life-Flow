const userModel = require("../models/userModel");
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

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

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
        success: false,
      });
    }
    //check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        message: "Invalid Email or Password",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d",});
    return res.status(200).send({
      message: "Login Successful",
      success: true,
      user: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        message: "Error in Login",
        success: false,
        error,
    });
  }
};

module.exports = {registerController, loginController };