const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler.js");
const Creator = require("../models/creatorModel.js");
const ApiFeatures = require("../utils/ApiFeatures.js");
const Donation = require("../models/donationModel.js");

// add creators to the creator model db
exports.addCreator = catchAsyncErrors(async (req, res, next) => {
  const creator = await Creator.create(req.body);
  res.status(201).json({
    success: true,
    creator,
  });
});

// Creating a paginated api listing all creators containing all information required to  render ‘All Creators Screen’
exports.getAllCreators = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Creator.find(), req.query).pagination(3);
  const creators = await apiFeatures.query;

  res.status(200).json({
    success: true,
    creators,
  });
});


// adding a donation to the donation model db
exports.addDonation = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user, "req.user");
  const { toCreator, amount, currency } = req.body;
  if (!toCreator || !amount || !currency) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }
  const fromCreator = req.user.id;
  if (toCreator === fromCreator) {
    return next(new ErrorHandler("You cannot donate to yourself", 400));
  }
  if (amount < 0) {
    return next(new ErrorHandler("You cannot donate negative amount", 400));
  }
  const donation = await Donation.create({
    ...req.body,
    fromCreator,
  });

  res.status(201).json({
    success: true,
    donation,
  });
});

// get donation of a particular creator
exports.getDonation = catchAsyncErrors(async (req, res, next) => {
  const donation = await Donation.find({ fromCreator: req.user.id }).populate(
    "toCreator",
    "userName"
  );
  res.status(200).json({
    success: true,
    donation,
  });
});

// get donations from a to b
exports.getDonationToOther = catchAsyncErrors(async (req, res, next) => {
  // take id of and b
  const { toCreator } = req.query;
  const fromCreator = req.user.id;
  const donations = await Donation.find({
    fromCreator,
    toCreator,
  }).populate("toCreator", "userName");
  res.status(200).json({
    success: true,
    donations,
  });
});
