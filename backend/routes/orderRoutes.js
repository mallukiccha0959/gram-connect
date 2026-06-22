const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus,
  getVendorAnalytics,
  createPaymentOrder,
} = require("../controllers/orderController");

const {
  protect,
  vendor,
} = require("../middleware/authMiddleware");


// PLACE ORDER
router.post(
  "/",
  protect,
  placeOrder
);


// GET MY ORDERS
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


// GET VENDOR ORDERS
router.get(
  "/vendor-orders",
  protect,
  vendor,
  getVendorOrders
);


// GET VENDOR ANALYTICS
router.get(
  "/vendor-analytics",
  protect,
  vendor,
  getVendorAnalytics
);


// CREATE PAYMENT ORDER
router.post(
  "/create-payment-order",
  protect,
  createPaymentOrder
);


// UPDATE ORDER STATUS
router.put(
  "/:id/status",
  protect,
  vendor,
  updateOrderStatus
);


module.exports = router;