import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUsers = JSON.parse(localStorage.getItem("upfor_users")) || [];
    const user = savedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user || (email === "admin@upfor.com" && password === "123456")) {
      localStorage.setItem("upfor_loggedin", "true");
      localStorage.setItem("upfor_currentUser", email);
      navigate("/home");
    } else {
      setError("Invalid credentials. Try again or Sign Up.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          width: 340,
          padding: "40px 30px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#000", marginBottom: 10 }}>UpFor</h1>
        <h2 style={{ marginBottom: 5 }}>Welcome Back</h2>
        <p style={{ color: "#555", fontSize: 14, marginBottom: 25 }}>
          Let’s get started by filling out the form below.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: "#f1f3f6",
              fontSize: 14,
              marginBottom: 15,
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "none",
              background: "#f1f3f6",
              fontSize: 14,
              marginBottom: 15,
            }}
          />

          {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#E5004E",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            marginTop: 15,
            color: "#333",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#3b3bed",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Sign Up here
          </span>
        </p>
      </div>
    </div>
  );
}
