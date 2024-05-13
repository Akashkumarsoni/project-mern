const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const productRoutes = require("./routes/productRoutes");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
dotenv.config();
const { PORT, DB_USER, DB_PWD, SECRET_KEY } = process.env;
const app = express();
app.use(cookieParser());
const url = `mongodb+srv://${DB_USER}:${DB_PWD}@crud-oprn.a34mk4f.mongodb.net/?retryWrites=true&w=majority&appName=crud-oprn`;

mongoose.connect(url).then((conn)=>{
    console.log("Connection stablished");
});

app.use(express.json());
app.use("/api/user",userRoutes);
app.use("/api/product", productRoutes);

const payload = {name : 'Akash Soni'};
app.get("/signup",(req,res)=>{
    try{
        jwt.sign({data:payload},SECRET_KEY,{algorithm:"HS256"},(err,data)=>{
            if(err) {
                console.log("Error ")
                throw new Error(err.message);
            }
            res.cookie('token',data,{
                maxAge:30*60*1000,
                httpOnly:true
            });

            res.status(200).json({
                authToken : data
            })
        });
    }catch(e){
        res.status(400).json({
            message : e.message
        })
    }
})
app.get("/verify",(req,res)=>{
    try{
        const {token} = req.cookies;
        console.log("jwt",jwt)
        const decoded = jwt.verify(token,SECRET_KEY);
        res.status(200).json({
            authToken : "Token decoded successfully",
            decoded
        })
    }catch(e){
        res.status(400).json({
            message : e.message
        })
    }
})
app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message : "User loggedout successfully"
    })
})
app.listen(PORT,()=>{
    console.log("Working...",'http://localhost:3000');
})
