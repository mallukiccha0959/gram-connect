const express = require("express");

const router = express.Router();

const {

  getAssignedOrders,

  acceptDelivery,

  rejectDelivery,

  updateDeliveryStatus,

  getDeliveryAnalytics,

} = require(
  "../controllers/deliveryController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);


// GET ORDERS
router.get(
  "/orders",
  protect,
  getAssignedOrders
);


// ANALYTICS
router.get(
  "/analytics",
  protect,
  getDeliveryAnalytics
);


// ACCEPT DELIVERY
router.put(
  "/orders/:id/accept",
  protect,
  acceptDelivery
);


// REJECT DELIVERY
router.put(
  "/orders/:id/reject",
  protect,
  rejectDelivery
);


// UPDATE STATUS
router.put(
  "/orders/:id/status",
  protect,
  updateDeliveryStatus
);


module.exports = router;