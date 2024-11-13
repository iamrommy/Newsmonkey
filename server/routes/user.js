const express = require("express");
const router = express.Router();
const passport = require('passport');

const {
  logIn,
  signUp,
  sendOTP,
  myProfile,
  logout,
  updateProfilePicture,
  removeProfilePicture,
  setPreferedCountry,
  changePassword,
  deleteProfile,
  resetPasswordToken,
  resetPassword
} = require("../controllers/Authentication");
const { isAuthenticated } = require("../middlewares/auth");
const { addToBookmarks, removeFromBookmarks, fetchBookmarks } = require("../controllers/Bookmarks");


router.post("/login", logIn);

router.post("/signup", signUp);

router.post("/sendotp", sendOTP);

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get('/me', isAuthenticated, myProfile);
router.get('/logout', logout);
router.put('/updateDisplayPicture', updateProfilePicture);
router.put('/removeProfilePicture', removeProfilePicture);
router.put('/setPreferedCountry', setPreferedCountry);
router.put('/changePassword', changePassword);
router.delete('/deleteProfile', deleteProfile);
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword)
router.post('/addToBookmarks', addToBookmarks);
router.post('/removeFromBookmarks', removeFromBookmarks);

module.exports = router;