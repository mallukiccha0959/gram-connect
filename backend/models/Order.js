const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,

        image: String,

        price: Number,

        quantity: Number,
      },
    ],

    shippingAddress: {
      type: String,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    deliveryAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deliveryStatus: {
      type: String,
      enum: [
        "Assigned",
        "Accepted",
        "Picked Up",
        "On The Way",
        "Delivered",
        "Rejected",
      ],
      default: "Assigned",
    },

    deliveryAcceptedAt: Date,

    deliveredAt: Date,

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);