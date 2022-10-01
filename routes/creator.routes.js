const express = require("express");
const {
  addCreator,
  getAllCreators,
  addDonation,
  getDonation,
  getDonationToOther
} = require("../controllers/creator.controller");
const { isAuthenticatedUser } = require("../middleware/Auth");
const router = express.Router();

router.route("/addcreator").post(addCreator);

router.route("/allcreators").get(getAllCreators);

router.route("/donation").post(isAuthenticatedUser, addDonation);

router.route("/getdonations").get(isAuthenticatedUser, getDonation);

router.route("/donationbetween").get(isAuthenticatedUser, getDonationToOther);

module.exports = router;

