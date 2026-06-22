const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

// PRODUCT ROUTES IMPORT
const productRoutes = require("./routes/productRoutes");

// ORDER ROUTES IMPORT
const orderRoutes = require("./routes/orderRoutes");

// ADMIN ROUTES IMPORT
const adminRoutes =
  require("./routes/adminRoutes");

// DELIVERY ROUTES IMPORT
const deliveryRoutes =
  require("./routes/deliveryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// PRODUCT ROUTES
app.use("/api/products", productRoutes);

// ORDER ROUTES
app.use("/api/orders", orderRoutes);

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// DELIVERY ROUTES
app.use(
  "/api/delivery",
  deliveryRoutes
);

// TEST ROUTES
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("GramConnect API Running 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log(err);
  });