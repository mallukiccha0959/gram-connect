const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {

      type: String,

      enum: [
        "customer",
        "vendor",
        "admin",
      ],

      default: "customer",

    },

    userStatus: {

      type: String,

      enum: [
        "Approved",
        "Pending",
        "Rejected",
        "Blocked"
      ],

      default: "Approved",

    },

    vendorStatus: {

      type: String,

      enum: [

        "Pending",

        "Approved",

        "Rejected",

        "Blocked",

      ],

      default: "Pending",

    },

    // EMAIL VERIFICATION
    isVerified: {
      type: Boolean,
      default: false,
    },

    // OTP
    otp: {
      type: String,
    },

    // OTP EXPIRY
    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);