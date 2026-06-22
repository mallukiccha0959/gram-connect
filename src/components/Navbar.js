import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import CartSidebar from "./CartSidebar";
import NotificationCenter from "./NotificationCenter";

// IMPORT AUTH CONTEXT
import { AuthContext } from "../context/AuthContext";

export default function Navbar({
  cart,
  darkMode,
  setDarkMode
}) {

  const navigate = useNavigate();

  // AUTH CONTEXT
  const { user, logout } = useContext(AuthContext);

  // Sidebar state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-4 md:p-5 bg-white/30 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-white/20">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text cursor-pointer"
        >
          Gram Connect 🌾
        </h1>

        <div className="flex items-center space-x-2 md:space-x-4 text-sm md:text-base">

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="hover:text-purple-600 transition"
          >
            Home
          </button>

          {/* Notification Center */}
          <NotificationCenter />

          {/* Wishlist Button */}
          <button
            onClick={() => navigate("/wishlist")}
            className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
          >
            ❤️ Wishlist
          </button>

          {/* ORDERS BUTTON */}
          <button
            onClick={() => navigate("/my-orders")}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            Orders
          </button>

          {/* Cart Button */}
          <div
            onClick={() => navigate("/cart")}
            className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition"
          >
            Cart ({cart?.length || 0})
          </div>

          {/* Dark Mode Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* ADMIN DASHBOARD BUTTON */}
          {user?.user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Admin
            </button>
          )}

          {/* VENDOR DASHBOARD BUTTON */}
          {user?.user?.role === "vendor" && (
            <button
              onClick={() => navigate("/vendor")}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
            >
              Vendor
            </button>
          )}

          {/* DELIVERY DASHBOARD BUTTON */}
          {user?.user?.role === "delivery" && (
            <button
              onClick={() => navigate("/delivery")}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Delivery
            </button>
          )}

          {/* LOGIN / LOGOUT BUTTON */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Login
            </button>
          )}

        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}