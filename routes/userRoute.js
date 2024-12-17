const express = require("express");

const { isAuthUser } = require("../middlewares/auth");
const { registeruser, loginuser, userlogout, getuserdetails, updateuser } = require("../controllers/userController");


const router = express.Router();
router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/logout").post(isAuthUser,userlogout);
router.route("/me").get(isAuthUser, getuserdetails);
router.route("/me/update").put(isAuthUser, updateuser);

module.exports = router;