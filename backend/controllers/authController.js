const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// GENERATE TOKEN
const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

};


// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // CHECK USER EXISTS
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // CREATE USER
    const user = await User.create({

      name,

      email,

      password: hashedPassword,

      role,

    });

    res.status(201).json({

      message: "User registered successfully",

      user,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }

    // VENDOR STATUS CHECK
    if (
      user.role === "vendor" &&
      user.vendorStatus !== "Approved"
    ) {

      return res.status(401).json({
        message:
          `Vendor account is ${user.vendorStatus}`
      });

    }

    // CUSTOMER STATUS CHECK
    if (
      user.role === "customer" &&
      user.userStatus !== "Approved"
    ) {

      return res.status(401).json({

        message:
          `User account is ${user.userStatus}`,

      });

    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (
      user &&
      isMatch
    ) {

      res.json({

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        token: generateToken(user._id),

      });

    } else {

      return res.status(401).json({
        message: "Invalid email or password"
      });

    }

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  registerUser,
  loginUser,
};