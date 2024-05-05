const ProductModel = require("../modules/productModel");
const { createFactory, getFactory,getFactoryDatabyId, deleteFactoryData } = require("../utils/crudFactory");

const createProduct = createFactory(ProductModel);
const getProducts = getFactory(ProductModel);
const getProductbyId = getFactoryDatabyId(ProductModel);
const deleteProduct = deleteFactoryData(ProductModel);

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let products = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!products) {
      res.status(400).json({
        status: "failure",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User data deleted successfully!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
const getProductHandler = async (req, res) => {
  try {
    const query = req.query;
    const sortParams = query.sort;
    let queryResponsePromise = ProductModel.find();
    if (sortParams) {
      const [sortParam, order] = sortParams.split(" ");
      if (order === "asc") {
        queryResponsePromise = queryResponsePromise.sort(sortParam);
      } else {
        queryResponsePromise = queryResponsePromise.sort(`-${sortParam}`);
      }
    }
    const result = await queryResponsePromise;
    res.status(200).json({
      message: "Get products successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createProduct,
  getProducts,
  getProductbyId,
  updateProduct,
  deleteProduct,
  getProductHandler,
};
