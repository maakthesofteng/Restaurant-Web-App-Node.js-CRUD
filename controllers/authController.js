const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

exports.postClientRegisterController = async (req, res) => {
  try {
    const { userName, email, password, address, phoneNumber, answer } = req.body;
    if (!userName || !email || !password || !address || !phoneNumber || !answer) {
      return res.status(500).send({
        success: false,
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists with this email, Go to login page"
      });
    }
    // Hasing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // Register new user
    const newUser = User.create({
      userName,
      email,
      password : hashedPassword,
      address,
      phoneNumber,
      answer
    });
    res.status(201).send({
      success: true,
      message: "Client registered successfully",
      newUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering client",
      error
    });
  }
};

exports.postClientLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Email and Password are required"
      });
    }

    // Check User
    const checkUser = await User.findOne({ email});
    if (!checkUser) {
      res.status(500).send({
        success: false,
        message: "Invalid Email",
      });
    }
    // Check Password after hashing
    const isMatch = await bcrypt.compare(password, checkUser.password);
    if(!isMatch){
        return res.status(500).send({
            success: false,
            message: "Invalid Credentials",
        })
    }
    // Token
    const token = JWT.sign({id : checkUser._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
    // If login successfull then don't show password in response
    checkUser.password = undefined
    res.status(200).send({
        success: true,
        message: "Client logged in successfully",
        token,
        checkUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in client login",
      error
    });
  }
};
