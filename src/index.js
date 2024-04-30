const express = require("express");
const mongoose = require("mongoose");
// const UserModel = require('./modules/userModule');

// const userRoutes = require('./routes/userRoutes')
const app = express();
const url = `mongodb+srv://akash-mongo-connect:akash-mongo-connect@crud-oprn.a34mk4f.mongodb.net/?retryWrites=true&w=majority&appName=crud-oprn`
mongoose.connect(url).then((conn)=>{
    console.log("Connection stablished");
});

app.use(express.json()); // to read data from request body
const userSchemaObj = {
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        // required: true,
        // unique: true 
    },

    password:{
        type: String,
        // required: true,
        // minlength: 8
    },

    confirmPassword: {
        type: String,
        // required: true,
        // minlength: 8,
        // validate: function(){
        //     return this.password === this.confirmPassword
        // }
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

};

const userSchema = new mongoose.Schema(userSchemaObj);
const UserModel = mongoose.model("UserModel",userSchema);
const createUser = async(req, res) => {
    try {
        let user =  UserModel.create(req.body);
        if(!user) {
            res.status(400).json({
                status:"failure"
            });
        }
        res.status(200).json({
            status:"success",
            message: "User has been registered successfully!"
        })
    }catch(error) {
        res.status(500).json({message: 'Internal Server Error',error:error});
    }
}
app.use("/api/user",createUser);
app.listen(3000,()=>{
    console.log("Working...");
})
