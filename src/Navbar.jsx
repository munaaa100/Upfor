import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, User, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("upfor_loggedin");
    navigate("/");
  };

  const navItems = [
    { icon: <Home size={22} />, label: "Home", path: "/home" },
    { icon: <Compass size={22} />, label: "Explore", path: "/explore" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "white",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
        padding: "10px 0",
        zIndex: 50,
        borderTop: "1px solid #eee",
        transition: "all 0.3s ease",
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              cursor: "pointer",
              color: isActive ? "#E91E63" : "#888",
              transition: "all 0.25s ease",
              transform: isActive ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            <div
              style={{
                background: isActive ? "rgba(233,30,99,0.1)" : "transparent",
                borderRadius: "50%",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s ease",
              }}
            >
              {item.icon}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#E91E63" : "#777",
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      {/* Logout button */}
      <div
        onClick={handleLogout}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          cursor: "pointer",
          color: "#999",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            padding: 8,
            background: "rgba(0,0,0,0.03)",
          }}
        >
          <LogOut size={20} />
        </div>
        <span style={{ fontSize: 12 }}>Logout</span>
      </div>
    </div>
  );
}
