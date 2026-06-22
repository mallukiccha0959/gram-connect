import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

/* =========================
   CUSTOMER PAGES
========================= */

import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import Wishlist from "./pages/customer/Wishlist";
import Cart from "./pages/customer/Cart";
import ProductDetails from "./pages/customer/ProductDetails";
import MyOrders from "./pages/customer/MyOrders";

/* =========================
   AUTH PAGES
========================= */

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* =========================
   VENDOR PAGES
========================= */

import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProduct from "./pages/vendor/AddProduct";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorOrdersPage from "./pages/VendorOrdersPage";

/* =========================
   ADMIN PAGES
========================= */

import AdminDashboard from "./pages/admin/AdminDashboard";

/* =========================
   OTHER PAGES
========================= */

import CartPage from "./pages/CartPage";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import Unauthorized from "./pages/Unauthorized";

/* =========================
   COMPONENTS
========================= */

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  // Cart state
  const [cart, setCart] = useState([]);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>

      <Routes>

        {/* =========================
            CUSTOMER ROUTES
        ========================= */}

        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              setCart={setCart}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        {/* =========================
            AUTH ROUTES
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* =========================
            VENDOR ROUTES
        ========================= */}

        <Route
          path="/vendor"
          element={
            <ProtectedRoute role="vendor">
              <VendorDashboard
                cart={cart}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute role="vendor">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor-products"
          element={
            <ProtectedRoute role="vendor">
              <VendorProducts />
            </ProtectedRoute>
          }
        />

        {/* VENDOR ORDERS PAGE */}
        <Route
          path="/vendor/orders"
          element={<VendorOrdersPage />}
        />

        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard
                cart={cart}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                wishlist={wishlist}
              />
            </ProtectedRoute>
          }
        />

        {/* =========================
            DELIVERY ROUTES
        ========================= */}

        <Route
          path="/delivery"
          element={
            <ProtectedRoute role="delivery">
              <DeliveryDashboard
                cart={cart}
                wishlist={wishlist}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ORDER ROUTES
        ========================= */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/tracking"
          element={
            <OrderTracking
              cart={cart}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* =========================
            UNAUTHORIZED
        ========================= */}

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

      </Routes>

    </Router>
  );
}