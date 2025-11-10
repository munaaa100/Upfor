import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UpForPage from "./UpForPage";
import ExplorePage from "./ExplorePage";
import ProfilePage from "./ProfilePage";
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import EventPage from "./EventPage";

function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("upfor_loggedin") === "true";
  return loggedIn ? children : <Navigate to="/" replace />;
}

export default function App() {
  const loggedIn = localStorage.getItem("upfor_loggedin") === "true";

  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <UpForPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <ExplorePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/event/engifest"
            element={
              <PrivateRoute>
                <EventPage />
              </PrivateRoute>
            }
          />
        </Routes>
        {loggedIn && <Navbar />}
      </div>
    </Router>
  );
}
