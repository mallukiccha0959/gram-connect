const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");


// ADMIN ANALYTICS
const getAdminAnalytics = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments({
      role: "customer",
    });

    const totalVendors = await User.countDocuments({
      role: "vendor",
    });

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        status: "Pending",
      });

    const deliveredOrders =
      await Order.countDocuments({
        status: "Delivered",
      });

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    res.json({
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE USER STATUS
const updateUserStatus = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.userStatus = req.body.status;

    await user.save();

    res.json({
      message:
        "User status updated",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET ALL VENDORS
const getAllVendors = async (
  req,
  res
) => {

  try {

    const vendors = await User.find({
      role: "vendor",
    })

      .select("-password")

      .sort({ createdAt: -1 });

    res.json(vendors);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE VENDOR STATUS
const updateVendorStatus =
  async (req, res) => {

    try {

      const vendor =
        await User.findById(
          req.params.id
        );

      if (!vendor) {

        return res.status(404).json({

          message:
            "Vendor not found",

        });

      }

      vendor.vendorStatus =
        req.body.status;

      await vendor.save();

      res.json(vendor);

    } catch (error) {

      res.status(500).json({

        message: error.message,

      });

    }

  };


// DELETE VENDOR
const deleteVendor = async (
  req,
  res
) => {

  try {

    const vendor =
      await User.findById(
        req.params.id
      );

    if (!vendor) {

      return res.status(404).json({
        message: "Vendor not found",
      });

    }

    await vendor.deleteOne();

    res.json({
      message: "Vendor deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET ALL PRODUCTS
const getAllProducts = async (
  req,
  res
) => {

  try {

    const products = await Product.find()

      .populate(
        "vendor",
        "name email"
      )

      .sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE PRODUCT
const deleteProductAdmin =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }

      await product.deleteOne();

      res.json({
        message:
          "Product deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


// GET ALL ORDERS
const getAllOrders = async (
  req,
  res
) => {

  try {

    const orders = await Order.find()

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


// UPDATE ORDER STATUS
const updateOrderStatusAdmin =
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

      order.status =
        req.body.status ||
        order.status;

      await order.save();

      res.json(order);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };


// DELETE USER
const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    await user.deleteOne();

    res.json({
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ASSIGN DELIVERY AGENT
const assignDeliveryAgent =
async (req, res) => {

  try {

    const {
      deliveryAgentId,
    } = req.body;

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

    order.deliveryAgent =
      deliveryAgentId;

    order.status =
      "Assigned";

    await order.save();

    res.json({

      message:
        "Delivery agent assigned",

      order,

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }

};


module.exports = {

  getAdminAnalytics,

  getAllUsers,

  deleteUser,

  updateUserStatus,

  getAllVendors,

  updateVendorStatus,

  deleteVendor,

  getAllProducts,

  deleteProductAdmin,

  getAllOrders,

  updateOrderStatusAdmin,

  assignDeliveryAgent,

};