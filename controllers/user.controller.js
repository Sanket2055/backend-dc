const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken.js");
const Creator = require("../models/creatorModel.js");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log("i m here");
  const data = await User.findOne({ username: req.body.username });
  if (data) {
    return next(
      new ErrorHandler("Username already exists , Sign In instead", 400)
    );
  }
  //   check if email and password are sent or not
  if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
    return next(
      new ErrorHandler("Please Enter Name , password and ConfirmPassword", 400)
    );
  }

  if (req.body.password.length < 8) {
    return next(
      new ErrorHandler("Password should be greater than 8 characters", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const user = await User.create({ ...req.body });
  sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    // if user not found
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 200, res);
});

// logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

