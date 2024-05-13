const express = require("express");

const {
  createProduct,
  getProducts,
  getProductbyId,
  updateProduct,
  deleteProduct,
  getProductHandler,
  getProductCategories
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductbyId);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/bigBillionDay", getProductHandler);
router.get("/categories", getProductCategories);


module.exports = router;
