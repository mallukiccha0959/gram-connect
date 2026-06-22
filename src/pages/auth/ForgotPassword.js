import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(res.data.message);

      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        window.location.href = "/reset-password";
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Forgot Password 🔐</h1>

        <p style={subtitleStyle}>
          Enter your email to receive OTP
        </p>

        <form onSubmit={handleForgotPassword}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              color: "#111",
              backgroundColor: "#ffffff",
              marginBottom: "20px",
            }}
          />

          <button type="submit" style={buttonStyle}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

        {message && (
          <div style={messageStyle}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
};

const cardStyle = {
  width: "400px",
  padding: "40px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  color: "white",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  opacity: 0.8,
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(to right,#9333ea,#ec4899)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "20px",
  textAlign: "center",
  background: "rgba(255,255,255,0.1)",
  padding: "10px",
  borderRadius: "10px",
};

export default ForgotPassword;