const express = require("express");

const {
  signupController
} = require("../controllers/authController");

const router = express.Router();

router.post("/", signupController);
router.get("/", getProducts);


module.exports = router;
