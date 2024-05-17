const UserModel = require("../modules/userModule");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const { SECRET_KEY } = process.env;

const signupController = async (req, res, next) => {
  const userObj = req.body;
  try {
    if (userObj) {
      let newUser = await UserModel.create(userObj);
      res.status(200).json({
        status: "succes",
        message: "User has been created Successfully!!",
        data: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
// JWT Signature
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({
      status: "failure",
      message: "User not found",
    });
  }
  twilio=`4KX2SPLK1L2QEXD7BQBL33FE`
  const isPwdSame = password === user?.password;
  try {
    if (isPwdSame) {
      try {
          jwt.sign({ id: user["_id"] }, SECRET_KEY, { algorithm: "HS512" }, (err, token) => {
            if (err) {
              console.log("err",err);
              throw new Error(err.message);
            }
            res.cookie("token", token, {
              maxAge: 30 * 60 * 1000,
              httpOnly: true,
            });
            res.status(200).json({
              status: "success",
              message: "User has been logged in",
            });
          });
      } catch (error) {
        res.json({
          status: "failure",
          message: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
// JWT Verify
const protectRouteMiddleware = (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodedToken = jwt.verify(token, SECRET_KEY);
    if (decodedToken) {
      const userId = decodedToken.id;
      req.userId = userId;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res) => {
  const id = req.userId;
  const userDetails = await UserModel.findById(id);
  const { name, email } = userDetails;
  res.status(200).json({
    status: "sccuess",
    message: "User data retrieved successfully!!",
    user: {
      name,
      email,
    },
  });
};
module.exports = {
  signupController,
  loginController,
  protectRouteMiddleware,
  getUserProfile,
};
