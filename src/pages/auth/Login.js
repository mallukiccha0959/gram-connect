import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("customer");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const { data } = await axios.post(
        "https://gram-connect-ten.vercel.app/api/auth/login",
        {
          email,
          password,
          role,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "role",
        data.role
      );

      if (data.role === "admin") {

        navigate("/admin");

      } else if (data.role === "vendor") {

        navigate("/vendor");

      } else if (data.role === "delivery") {

        navigate("/delivery");

      } else {

        navigate("/");

      }

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 mb-3 text-sm text-center">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-2 border mb-3 rounded"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-2 border mb-3 rounded"
          />

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full p-2 border mb-4 rounded"
          >
            <option value="customer">
              Customer 🛒
            </option>

            <option value="vendor">
              Vendor 👨‍🌾
            </option>

            <option value="delivery">
              Delivery 🚚
            </option>

            <option value="admin">
              Admin 🛠
            </option>
          </select>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {/* Forgot Password */}
          <p
            style={{
              marginTop: "15px",
              textAlign: "right",
              cursor: "pointer",
              color: "#9333ea",
              fontWeight: "bold",
            }}
            onClick={() =>
              (window.location.href =
                "/forgot-password")
            }
          >
            Forgot Password?
          </p>

        </form>

        {/* Register Button */}
        <Link to="/register">
          <button className="w-full mt-4 border border-purple-600 text-purple-600 py-3 rounded-xl hover:bg-purple-50 transition">
            Create New Account
          </button>
        </Link>

      </div>

    </div>
  );
}