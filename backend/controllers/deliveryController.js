const Order = require("../models/Order");


// GET ASSIGNED ORDERS
const getAssignedOrders = async (
  req,
  res
) => {

  try {

    const orders = await Order.find({
      deliveryAgent: req.user._id,
    })

      .populate(
        "user",
        "name email"
      )

      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ACCEPT DELIVERY
const acceptDelivery = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    order.deliveryStatus =
      "Accepted";

    order.deliveryAcceptedAt =
      new Date();

    await order.save();

    res.json({
      message:
        "Delivery accepted",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// REJECT DELIVERY
const rejectDelivery = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    order.deliveryStatus =
      "Rejected";

    await order.save();

    res.json({
      message:
        "Delivery rejected",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE DELIVERY STATUS
const updateDeliveryStatus =
  async (req, res) => {

    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({
          message:
            "Order not found",
        });

      }

      order.deliveryStatus =
        req.body.status;

      if (
        req.body.status ===
        "Delivered"
      ) {

        order.deliveredAt =
          new Date();

      }

      await order.save();

      res.json(order);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


// DELIVERY ANALYTICS
const getDeliveryAnalytics =
  async (req, res) => {

    try {

      const totalDeliveries =
        await Order.countDocuments({
          deliveryAgent:
            req.user._id,
        });

      const deliveredOrders =
        await Order.countDocuments({
          deliveryAgent:
            req.user._id,

          deliveryStatus:
            "Delivered",
        });

      const activeOrders =
        await Order.countDocuments({
          deliveryAgent:
            req.user._id,

          deliveryStatus: {
            $in: [
              "Accepted",
              "Picked Up",
              "On The Way",
            ],
          },
        });

      const delivered =
        await Order.find({
          deliveryAgent:
            req.user._id,

          deliveryStatus:
            "Delivered",
        });

      const earnings =
        delivered.reduce(
          (acc, item) =>
            acc + item.totalPrice * 0.1,
          0
        );

      res.json({

        totalDeliveries,

        deliveredOrders,

        activeOrders,

        earnings,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


module.exports = {

  getAssignedOrders,

  acceptDelivery,

  rejectDelivery,

  updateDeliveryStatus,

  getDeliveryAnalytics,

};