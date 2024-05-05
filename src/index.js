const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes')
const productRoutes = require("./routes/productRoutes");
const app = express();
const url = `mongodb+srv://akash-mongo-connect:akash-mongo-connect@crud-oprn.a34mk4f.mongodb.net/?retryWrites=true&w=majority&appName=crud-oprn`
mongoose.connect(url).then((conn)=>{
    console.log("Connection stablished");
});

app.use(express.json()); // to read data from request body

app.use("/api/user",userRoutes);
app.use("/api/product", productRoutes);
app.listen(3000,()=>{
    console.log("Working...",'http://localhost:3000');
})
