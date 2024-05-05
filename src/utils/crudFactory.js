
const createFactory = (Model) => {
  return async (req, res) => {
    try {
      let data = await Model.create(req.body);
      if (!data) {
        res.status(400).json({
          status: "failure",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Data has been registered successfully!",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  };
};

const getFactory = (Model) => {
  return async (req, res) => {
    try {
      let data = await Model.find();
      if (!data) {
        res.status(400).json({
          status: "failure",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Data list found!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  };
};

const getFactoryDatabyId = (Model) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      let data = await Model.findById(id);
      if (!data) {
        res.status(400).json({
          status: "failure",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Data found!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  };
};

const deleteFactoryData = (Model) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      let data = await Model.findByIdAndDelete(id);
      if (!data) {
        res.status(400).json({
          status: "failure",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Data deleted successfully!",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  };
};

module.exports = {
  createFactory,
  getFactory,
  getFactoryDatabyId,
  deleteFactoryData,
};
