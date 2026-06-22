const express = require("express");

const router = express.Router();

const {
  getAdminAnalytics,
  getAllUsers,
  deleteUser,
  getAllVendors,
  updateVendorStatus,
  deleteVendor,
  getAllProducts,
  deleteProductAdmin,
  getAllOrders,
  updateOrderStatusAdmin,
  updateUserStatus,
  assignDeliveryAgent,
} = require("../controllers/adminController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");


// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Admin route working");
});


// ANALYTICS
router.get(
  "/analytics",
  protect,
  admin,
  getAdminAnalytics
);


// USERS
router.get(
  "/users",
  protect,
  admin,
  getAllUsers
);

router.put(
  "/users/:id/status",
  protect,
  admin,
  updateUserStatus
);

router.delete(
  "/users/:id",
  protect,
  admin,
  deleteUser
);


// VENDORS
router.get(
  "/vendors",
  protect,
  admin,
  getAllVendors
);

router.put(
  "/vendors/:id",
  protect,
  admin,
  updateVendorStatus
);


// PRODUCTS
router.get(
  "/products",
  protect,
  admin,
  getAllProducts
);

router.delete(
  "/products/:id",
  protect,
  admin,
  deleteProductAdmin
);


// ORDERS
router.get(
  "/orders",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/orders/:id",
  protect,
  admin,
  updateOrderStatusAdmin
);


// ASSIGN DELIVERY
router.put(
  "/orders/:id/assign",
  protect,
  admin,
  assignDeliveryAgent
);


module.exports = router;