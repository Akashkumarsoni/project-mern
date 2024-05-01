const UserModel = require('../modules/userModule');

const createUser = async(req, res) => {
    try {
        console.log("user : ",{...UserModel});
        let user = await UserModel.create(req.body);
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

const getUsers = async(req, res) => {
    try {
        let user = await UserModel.find();
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

const getUser = async(req, res) =>{

}

const updateUser = async(req, res) =>{
    
}

const deleteUser = async(req, res) =>{
    
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}