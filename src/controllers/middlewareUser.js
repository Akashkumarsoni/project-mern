const checkInputCredentials = (req, res, next) => {
  const userDetails = req.body;
  const isEmpty = Object.keys(userDetails).length == 0;
  if (isEmpty) {
    res.status(400).json({
      success: false,
      message: "User Details are empty!",
    });
  } else {
    next();
  }
};

module.exports = {
  checkInputCredentials
};
