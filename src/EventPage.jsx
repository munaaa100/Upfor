import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventPage() {
  const navigate = useNavigate();

  const handleJoin = () => {
    const joined = JSON.parse(localStorage.getItem("upfor_joined")) || [];
    const event = {
      id: 999,
      title: "Engifest 2025 – DTU Cultural Fest",
      type: "Sponsored",
    };
    if (!joined.some((a) => a.id === event.id)) {
      joined.push(event);
      localStorage.setItem("upfor_joined", JSON.stringify(joined));
      alert("You’ve joined Engifest 2025 🎉");
    } else {
      alert("You’ve already joined this event ✅");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "none",
          color: "#E91E63",
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: 10,
        }}
      >
        ← Back
      </button>

      <img
        src="https://dtu.ac.in/uploads/events/engifest_banner.jpg"
        alt="Engifest"
        style={{
          width: "100%",
          borderRadius: 12,
          marginBottom: 20,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      />

      <h2 style={{ color: "#E91E63" }}>Engifest 2025 – DTU Cultural Fest</h2>
      <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6 }}>
        Engifest is Delhi Technological University’s annual cultural festival —
        a three-day celebration of music, dance, art, and talent.
        <br />
        <br />
        From celebrity performances and competitions to food stalls and night
        events, Engifest brings together students from across India to celebrate
        creativity and youth spirit.
      </p>

      <p style={{ marginTop: 10, fontWeight: 500 }}>
        📍 Venue: DTU Main Campus
        <br />
        🗓️ Date: 14th – 16th February 2025
      </p>

      <button
        onClick={handleJoin}
        style={{
          background: "#E91E63",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "10px 16px",
          fontWeight: "bold",
          marginTop: 15,
          cursor: "pointer",
        }}
      >
        Join Event
      </button>
    </div>
  );
}
