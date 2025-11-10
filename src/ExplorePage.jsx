import React from "react";

export default function ExplorePage() {
  const trending = [
    { id: 1, title: "Open Mic Night", place: "DTU Auditorium" },
    { id: 2, title: "Startup Pitch", place: "Innovation Centre" },
    { id: 3, title: "Art Jam", place: "Block J Lawn" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#E91E63" }}>Explore</h2>
      <p>Discover trending activities & people nearby</p>

      <input
        placeholder="Search events..."
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 6,
          border: "1px solid #ccc",
          marginBottom: 20,
        }}
      />

      {trending.map((t) => (
        <div
          key={t.id}
          style={{
            background: "white",
            marginBottom: 12,
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ margin: 0 }}>{t.title}</h4>
          <small style={{ color: "#555" }}>{t.place}</small>
        </div>
      ))}
    </div>
  );
}
