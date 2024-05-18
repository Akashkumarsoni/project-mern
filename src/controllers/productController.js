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
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      message: "User data deleted successfully!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const getProductHandler = async(req, res) => {
  try {
    console.log("req",req)
      const query = req.query;
      const sortParams = query.sort;
      const selectParams = query.select;
      const page = query.page || 1;
      const limit = query.limit || 3;
      const skip = (page - 1) * limit;

      const filterParams = query.filter;
      let queryResponsePromise = null;

      if(filterParams) {
          const filterObj = transfomedQueryHelper(filterParams)
          queryResponsePromise = ProductModel.find(filterObj);
      } else {
          queryResponsePromise = ProductModel.find();
      }
      // Sorting
      if(sortParams) {
          const [sortParam, order] = sortParams.split(" ");

          if(order === 'asc'){
              queryResponsePromise = queryResponsePromise.sort(sortParam);
          } else{
              queryResponsePromise = queryResponsePromise.sort(`-${sortParam}`);
          }
      }

      // Selecting the particular fields data from mongodb
      if(selectParams) {
          queryResponsePromise = queryResponsePromise.select(selectParams);
      }

      //pagination
      queryResponsePromise = queryResponsePromise.skip(skip).limit(limit);


      const result = await queryResponsePromise;

      res.status(200).json({
          message:"Get products successfully",
          data: result
      })

  } catch (error) {
      res.status(500).json({message: 'Internal Server Error'});
  }
}

const getProductCategories = async (req,res) => {
  try{
    console.log("Category")
      await res.status(200).json({
        success: true,
        message: "Get products successfully",
        data: ["electronics", "men's clothing", "women's clothing", "jewellery"],
      });

  } catch(e) {
    await res.status(500).json({
      message: e,
    });
  }
  
}
module.exports = {
  createProduct,
  getProducts,
  getProductbyId,
  updateProduct,
  deleteProduct,
  getProductHandler,
  getProductCategories
};
