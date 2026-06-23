import React, { useState, useEffect } from "react";
import axios from "axios";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "https://gram-connect-ten.vercel.app/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          OTP Verification 🔐
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            opacity: 0.8,
          }}
        >
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#cbd5e1",
          }}
        >
          OTP expires in:
          <span style={{ color: "#22c55e", marginLeft: "5px" }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>

        {message && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              padding: "10px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.1)",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(to right, #9333ea, #ec4899)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default VerifyOtp;