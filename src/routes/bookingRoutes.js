
const express= require("express");
const {
    checkoutController,
    paymentVerificationController,
} = require("../controllers/bookingController");
const route = express.Router();

route.post("/checkout",checkoutController);
route.post("/verify",paymentVerificationController);
module.exports = route

