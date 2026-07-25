import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container mt-4">
          <h2>⚙️ Settings</h2>

          <p>Settings page coming soon...</p>
        </div>
      </div>
    </>
  );
}

export default Settings;