const Product = require("../models/Product");
const Order = require("../models/Order");
const Razorpay = require("razorpay");

// RAZORPAY INSTANCE
const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,

});

// PLACE ORDER
const placeOrder = async (req, res) => {

  try {

    const {
      items,
      shippingAddress,
      totalPrice,
    } = req.body;

    const formattedItems = items.map(
      (item) => ({

        product: item.product,

        name: item.name,

        image: item.image,

        price: item.price,

        quantity: item.quantity,

      })
    );

    const order = await Order.create({

      user: req.user.id,

      items: formattedItems,

      shippingAddress,

      totalPrice,

    });

    res.status(201).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET MY ORDERS
const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({

      user: req.user._id,

    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET VENDOR ORDERS
const getVendorOrders = async (
  req,
  res
) => {

  try {

    // GET VENDOR PRODUCTS

    const products =
      await Product.find({

        vendor: req.user.id,

      });

    const productIds =
      products.map(
        (product) =>
          product._id.toString()
      );

    // GET ORDERS

    const orders = await Order.find()

      .populate(
        "user",
        "name email"
      )

      .sort({
        createdAt: -1,
      });

    // FILTER ORDERS

    const vendorOrders =
      orders.filter((order) =>

        order.items.some((item) =>

          productIds.includes(
            item.product?.toString()
          )

        )

      );

    res.json(vendorOrders);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

};


// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    order.status = req.body.status;

    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET VENDOR ANALYTICS
const getVendorAnalytics = async (
  req,
  res
) => {

  try {

    // GET VENDOR PRODUCTS

    const products =
      await Product.find({

        vendor: req.user.id,

      });

    const productIds =
      products.map(
        (product) => product._id
      );

    // GET ORDERS CONTAINING
    // VENDOR PRODUCTS

    const orders = await Order.find({

      "items.product": {
        $in: productIds,
      },

    });

    // TOTAL ORDERS

    const totalOrders =
      orders.length;

    // TOTAL REVENUE

    const totalRevenue =
      orders.reduce(

        (acc, order) =>

          acc + order.totalPrice,

        0

      );

    // PENDING ORDERS

    const pendingOrders =
      orders.filter(

        (order) =>
          order.status === "Pending"

      ).length;

    // DELIVERED ORDERS

    const deliveredOrders =
      orders.filter(

        (order) =>
          order.status === "Delivered"

      ).length;

    res.json({

      totalOrders,

      totalRevenue,

      pendingOrders,

      deliveredOrders,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Vendor analytics error",

      error: error.message,

    });

  }

};


// CREATE RAZORPAY ORDER
const createPaymentOrder = async (
  req,
  res
) => {

  try {

    const { amount } = req.body;

    const options = {

      amount: amount * 100,

      currency: "INR",

      receipt:
        "receipt_order_" +
        Date.now(),

    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.json(order);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


module.exports = {

  placeOrder,

  getMyOrders,

  getVendorOrders,

  updateOrderStatus,

  getVendorAnalytics,

  createPaymentOrder,

};