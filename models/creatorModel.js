
const mongoose = require("mongoose");


const creatorSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Name"],
    maxLength: [50, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  profileUrl: {
    type: String,
    required: [true, "Please Enter Your Profile URL"],
  },
  profession: {
    type: String,
    required: [true, "Please Enter Your Profession"],
  },
});


module.exports = mongoose.model("Creator", creatorSchema);