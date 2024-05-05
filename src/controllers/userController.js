const UserModel = require("../modules/userModule");
const { createFactory, getFactory, deleteFactoryData, getFactoryDatabyId } = require("../utils/crudFactory");

const createUser = createFactory(UserModel);
const getUsers = getFactory(UserModel);
const getUserbyId = getFactoryDatabyId(UserModel);
const deleteUser = deleteFactoryData(UserModel);

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID ",id,req)
    let user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({
        status: "failure",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User's data updated successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserbyId,
  updateUser,
  deleteUser,
};
