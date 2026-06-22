const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getVendorProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const {
  protect,
} = require("../middleware/authMiddleware");


// GET ALL PRODUCTS
router.get("/", getProducts);


// GET VENDOR PRODUCTS
router.get(
  "/vendor",
  protect,
  getVendorProducts
);


// NEW VENDOR PRODUCTS ROUTE
router.get(
  "/vendor-products",
  protect,
  getVendorProducts
);


// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);


// ADD PRODUCT
router.post(
  "/add",
  protect,
  addProduct
);


// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  updateProduct
);


// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  deleteProduct
);

module.exports = router;