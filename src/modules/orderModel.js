const mongoose = require("mongoose");

const bookingSchemaRules = {
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "failed", "success"],
  },
  user:  {
    type: String,
  },
  product: {
    type: Array
  },
  orderId: {
    type: String,
  },
};

const bookingSchema = new mongoose.Schema(bookingSchemaRules);
const BookingModel = new mongoose.model("BookingModel", bookingSchema);
module.exports = BookingModel;
