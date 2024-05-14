const express = require("express");

const {
  signupController,
  loginController,
  protectRouteMiddleware,
  getUserProfile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/getUser", protectRouteMiddleware, getUserProfile);

module.exports = router;
