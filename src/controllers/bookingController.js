const dotenv = require('dotenv');
const express = require('express');
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const cors = require("cors");
const BookingModel = require('../modules/orderModel');
const { getFactory } = require('../utils/crudFactory');
dotenv.config();
const { PORT, PRIVATE_KEY, PUBLIC_KEY, WEBHOOK_SECRET } = process.env;
const app = express();
app.use(express.json());
app.use(cors());
const getOrders = getFactory(BookingModel);
const checkoutController = (req, res) => {
    try {
        var razorpayInstance = new Razorpay({
            key_id: PUBLIC_KEY,
            key_secret: PRIVATE_KEY,
          });
          const paymentData = req.body
          var options = {
            amount: paymentData.amount, 
            currency: paymentData.currency,
            receipt: "receipt__"+shortid.generate(),
            payment_capture :1
          }; 
          razorpayInstance.orders.create(options, function(err, order) {
            res.status(201).json({
                data : {
                    id: order.id,
                    amount : order.amount,
                    created_at: order.created_at,
                    status:order.status
                },
                success:true
            })
          });
    } catch (error) {
        res.status(500).json({
            message:error,
            success:false
        })
    }
}
const paymentVerificationController = async(req,res)=>{
    console.log("all req",req.body);
    try {
        if(!WEBHOOK_SECRET) {
            throw new Error("Webhook secret not available.")
        }
        const {body, headers} = req;
        const orderData  = {
            bookedAt: body.date,
            status: "success",
            product: Object.values(req.body.products).map((e)=>e),
            orderId: body.order_id,
            user:body.user_id
          };
          console.log("order create",Object.values(req.body).map((e)=>e))
        let data = await BookingModel.create(orderData);
        console.log("Bookinres",data)
        // const razorpaySignature = headers["x-razorpay-signature"]
        // if(!razorpaySignature) {
        //     throw new Error("x-razorpay-signature is not provided in header")
        // }
        res.status(201).json({
                message:"Your order is placed successfully!",
                success:true
            })
        // console.log("razorpaySignature === freshSign",razorpaySignature === freshSign,freshSign)
        // console.log("razorpaySignature",razorpaySignature)
        // if(razorpaySignature === freshSign) {
        //     return res.status(500).json({
        //         message:"OK",
        //         success:true
        //     })
        // }
        
    } catch (error) {
        res.status(500).json({
            message:error,
            success:false
        })
    }
}
module.exports = {
    checkoutController,
    paymentVerificationController,
    getOrders
}

// ngrok http http://localhost:8080
// https://0eb3-2405-201-6006-197-71bd-db13-b7db-fff7.ngrok-free.app