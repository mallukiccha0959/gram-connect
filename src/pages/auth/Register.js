import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [role, setRole] = useState("customer");

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // REGISTER FUNCTION
  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(response.data.message);

      // SAVE EMAIL FOR OTP PAGE
      localStorage.setItem("verifyEmail", email);

      // REDIRECT TO OTP PAGE
      window.location.href = "/verify-otp";

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-4">

      <div className="bg-white/50 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="delivery">Delivery Partner</option>
        </select>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        />

        {/* Vendor extra fields */}
        {role === "vendor" && (
          <>
            <input
              type="text"
              placeholder="Shop Name"
              className="w-full p-3 border rounded-xl mb-4"
            />

            <input
              type="file"
              className="w-full p-3 border rounded-xl mb-4"
            />
          </>
        )}

        {/* Delivery extra fields */}
        {role === "delivery" && (
          <input
            type="file"
            className="w-full p-3 border rounded-xl mb-4"
          />
        )}

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl"
        >
          Register
        </button>

      </div>
    </div>
  );
}