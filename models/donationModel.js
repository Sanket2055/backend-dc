const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  fromCreator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  toCreator: {
    type: mongoose.Schema.ObjectId,
    ref: "Creator",
  },
  amount: {
    type: Number,
    required: [true, "Please enter amount"],
    maxLength: [4, "Amount cannot exceed 4 characters"],
    default: 0.0,
  },
  currency: {
    type: String,
    enum: ["USD", "INR", "EUR", "GBP", "AUD"],
    default: "USD",
  },
  name: {
    type: String,
    maxLength: [100, "Name cannot exceed 100 characters"],
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
