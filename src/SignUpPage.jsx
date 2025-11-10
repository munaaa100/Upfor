import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("upfor_users")) || [];
    if (users.some((u) => u.email === email)) {
      alert("User already exists! Please log in.");
      navigate("/");
    } else {
      users.push({ email, password });
      localStorage.setItem("upfor_users", JSON.stringify(users));
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
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
        <h2>Create Account</h2>
        <form onSubmit={handleSignUp}>
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
            Sign Up
          </button>
        </form>
        {success && (
          <p
            style={{
              color: "green",
              textAlign: "center",
              marginTop: 15,
              fontWeight: 500,
            }}
          >
            Account created! Redirecting...
          </p>
        )}
      </div>
    </div>
  );
}
