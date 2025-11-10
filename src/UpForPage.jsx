import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const center = { lat: 28.7499, lng: 77.117 }; // DTU
const libraries = ["places"];

export default function UpForPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA2HJith-6efEEhIcpdQfWj4E-DpcieRb4",
    libraries,
  });

  const navigate = useNavigate();

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Cricket Match at DTU Ground",
      type: "Sports",
      lat: 28.7509,
      lng: 77.1175,
      image:
        "https://img.freepik.com/free-photo/cricket-bat-ball-green-grass_1232-2966.jpg",
    },
    {
      id: 2,
      title: "Coding Meetup – Block I",
      type: "Tech",
      lat: 28.7513,
      lng: 77.1157,
      image:
        "https://img.freepik.com/free-photo/developer-coding-laptop_1098-18711.jpg",
    },
    {
      id: 3,
      title: "Coffee near Canteen",
      type: "Hangout",
      lat: 28.7489,
      lng: 77.1181,
      image:
        "https://img.freepik.com/free-photo/coffee-cup-with-coffee-beans_144627-16254.jpg",
    },
    {
      id: 4,
      title: "Engifest 2025 – DTU Cultural Fest",
      type: "Sponsored",
      lat: 28.7492,
      lng: 77.1168,
      isSponsored: true,
      image: "https://dtu.ac.in/uploads/events/engifest_banner.jpg",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState(
    JSON.parse(localStorage.getItem("upfor_joined")) || []
  );

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "Hangout",
    image: "",
  });

  const handleJoinToggle = (activity) => {
    const confirmJoin = window.confirm(
      joined.some((a) => a.id === activity.id)
        ? "Do you want to cancel joining this activity?"
        : "Do you want to join this activity?"
    );
    if (!confirmJoin) return;

    let updated;
    if (joined.some((a) => a.id === activity.id)) {
      updated = joined.filter((a) => a.id !== activity.id);
    } else {
      updated = [...joined, activity];
    }
    setJoined(updated);
    localStorage.setItem("upfor_joined", JSON.stringify(updated));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return alert("Please enter a title");

    const event = {
      id: Date.now(),
      ...newEvent,
      lat: 28.749 + Math.random() * 0.002,
      lng: 77.117 + Math.random() * 0.002,
    };
    setActivities([...activities, event]);
    setShowForm(false);
    setNewEvent({ title: "", type: "Hangout", image: "" });
  };

  const filtered = activities.filter((a) => {
    const matchesType = filter === "All" || a.type === filter;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (!isLoaded) return <p style={{ padding: 20 }}>Loading map...</p>;

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2 style={{ color: "#E91E63", margin: 0 }}>UpFor</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#E91E63",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            fontSize: 22,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </header>

      {/* Search */}
      <div style={{ textAlign: "center", padding: 20 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities..."
          style={{
            width: "90%",
            maxWidth: 400,
            padding: 10,
            borderRadius: 25,
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 15,
        }}
      >
        {["All", "Sports", "Tech", "Hangout", "Sponsored"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? "#E91E63" : "white",
              color: filter === cat ? "white" : "#333",
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: "6px 14px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map */}
      <div
        style={{
          height: "300px",
          borderRadius: 12,
          overflow: "hidden",
          margin: "0 16px",
        }}
      >
        <GoogleMap
          center={center}
          zoom={17}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {filtered.map((a) => (
            <Marker
              key={a.id}
              position={{ lat: a.lat, lng: a.lng }}
              onClick={() =>
                a.isSponsored
                  ? navigate(`/event/engifest`)
                  : handleJoinToggle(a)
              }
            />
          ))}
        </GoogleMap>
      </div>

      {/* Activity List */}
      <section style={{ padding: "16px 20px" }}>
        <h3>Nearby Activities</h3>
        {filtered.length === 0 && <p>No activities found 🚫</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((a) => {
            const isJoined = joined.some((x) => x.id === a.id);
            return (
              <li
                key={a.id}
                style={{
                  background: "white",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  borderLeft: a.isSponsored
                    ? "4px solid #E91E63"
                    : "4px solid transparent",
                }}
                onClick={() =>
                  a.isSponsored
                    ? navigate(`/event/engifest`)
                    : handleJoinToggle(a)
                }
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={
                      a.image ||
                      "https://img.freepik.com/free-icon/add-image_318-11398.jpg"
                    }
                    alt={a.title}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong>{a.title}</strong>
                    <div style={{ fontSize: 13, color: "#555" }}>{a.type}</div>
                    {a.isSponsored && (
                      <span
                        style={{
                          color: "#E91E63",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        Sponsored
                      </span>
                    )}
                  </div>
                  {!a.isSponsored && (
                    <button
                      style={{
                        background: isJoined ? "#ccc" : "#E91E63",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      {isJoined ? "Cancel" : "Join"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Add Event Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <form
            onSubmit={handleAddEvent}
            style={{
              background: "white",
              borderRadius: 12,
              padding: 20,
              width: 320,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: 0, textAlign: "center" }}>Post an Activity</h3>
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
              required
            />
            <select
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent({ ...newEvent, type: e.target.value })
              }
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            >
              <option>Sports</option>
              <option>Tech</option>
              <option>Hangout</option>
              <option>Sponsored</option>
            </select>
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newEvent.image}
              onChange={(e) =>
                setNewEvent({ ...newEvent, image: e.target.value })
              }
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#E91E63",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: 10,
                cursor: "pointer",
              }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: "#ccc",
                border: "none",
                borderRadius: 8,
                padding: 10,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
