const dotenv = require('dotenv');
const express = require('express');
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const cors = require("cors");
dotenv.config();
const { PORT, PRIVATE_KEY, PUBLIC_KEY, WEBHOOK_SECRET } = process.env;
const app = express();
app.use(express.json());
app.use(cors());


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
const paymentVerificationController = (req,res)=>{
    try {
        if(!WEBHOOK_SECRET) {
            throw new Error("Webhook secret not available.")
        }
        const {body, headers} = req;
        console.log("body ",body)
        console.log("body ",headers)

        const freshSign = crypto.createHmac("sha256",WEBHOOK_SECRET).update(JSON.stringify(body)).digest('hex');
        const razorpaySignature = headers["x-razorpay-signature"]
        if(!razorpaySignature) {
            throw new Error("x-razorpay-signature is not provided in header")
        }
        res.status(500).json({
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
}

// ngrok http http://localhost:8080
// https://0eb3-2405-201-6006-197-71bd-db13-b7db-fff7.ngrok-free.app