const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes')
const productRoutes = require("./routes/productRoutes");
const dotenv = require("dotenv");

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
app.use("/", authRoutes);

app.listen(PORT,()=>{
    console.log("Working...",'http://localhost:3000');
})
