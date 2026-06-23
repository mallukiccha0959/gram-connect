import React, { useEffect, useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "https://gram-connect-ten.vercel.app/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {

      setMessage(err.response?.data?.message || "Reset failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Reset Password 🔑</h1>

        <form onSubmit={handleResetPassword}>

          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Enter Email"
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

          {/* OTP INPUT */}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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

          {/* NEW PASSWORD INPUT */}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
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
  marginBottom: "30px",
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

export default ResetPassword;