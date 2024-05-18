
const express= require("express");
const {
    checkoutController,
    paymentVerificationController,
    getOrders
} = require("../controllers/bookingController");
const route = express.Router();

route.post("/checkout",checkoutController);
route.post("/verify",paymentVerificationController);
route.get("/orders",getOrders);
module.exports = route

