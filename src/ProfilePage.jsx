import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [joinedActivities, setJoinedActivities] = useState([]);

  useEffect(() => {
    // Load data
    const savedName = localStorage.getItem("upfor_name");
    const savedBio = localStorage.getItem("upfor_bio");
    const savedPic = localStorage.getItem("upfor_profilePic");
    const joined = JSON.parse(localStorage.getItem("upfor_joined")) || [];

    if (savedName) setName(savedName);
    if (savedBio) setBio(savedBio);
    if (savedPic) setProfilePic(savedPic);
    setJoinedActivities(joined);
  }, []);

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem("upfor_name", name);
    localStorage.setItem("upfor_bio", bio);
    alert("Profile saved ✅");
  };

  // Handle image upload
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("upfor_profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPic = () => {
    setProfilePic(null);
    localStorage.removeItem("upfor_profilePic");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#E91E63", marginBottom: 20 }}>My Profile</h2>

      {/* Profile Picture */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={
            profilePic ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #E91E63",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />
        <label
          htmlFor="upload"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            background: "#E91E63",
            color: "white",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
          title="Change Photo"
        >
          ✏️
        </label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePicChange}
        />
      </div>

      {/* Reset button */}
      {profilePic && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={handleResetPic}
            style={{
              fontSize: 13,
              color: "#E91E63",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Remove photo
          </button>
        </div>
      )}

      {/* Profile Info */}
      <div
        style={{
          marginTop: 25,
          textAlign: "left",
          maxWidth: 340,
          margin: "25px auto",
        }}
      >
        <label style={{ fontSize: 14, fontWeight: 500 }}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6,
            borderRadius: 8,
            border: "1px solid #ccc",
            marginBottom: 15,
          }}
        />

        <label style={{ fontSize: 14, fontWeight: 500 }}>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          rows="3"
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleSave}
          style={{
            marginTop: 20,
            background: "#E91E63",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Save Profile
        </button>
      </div>

      {/* Joined Activities Section */}
      <div style={{ marginTop: 40 }}>
        <h3>Joined Activities</h3>
        {joinedActivities.length === 0 ? (
          <p style={{ color: "#777" }}>
            You haven’t joined any activities yet.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxWidth: 340,
              margin: "0 auto",
            }}
          >
            {joinedActivities.map((a) => (
              <li
                key={a.id}
                style={{
                  background: "white",
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  textAlign: "left",
                }}
              >
                <strong>{a.title}</strong>
                <div style={{ fontSize: 13, color: "#555" }}>{a.type}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
