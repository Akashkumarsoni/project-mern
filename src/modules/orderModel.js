const mongoose = require("mongoose");

const bookingSchemaRules = {
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
  priceAtThatTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "failed", "success"],
  },
  user: {
    type: [mongoose.Schema.ObjectId],
    required: true,
    ref: "UserModel",
  },
  product: {
    type: [mongoose.Schema.ObjectId],
    required: true,
    ref: "ProductModel",
  },
  orderId: {
    type: String,
  },
};

const bookingSchema = new mongoose.Schema(bookingSchemaRules);
const BookingModel = new mongoose.model("BookingModel", bookingSchema);
module.exports = BookingModel;
