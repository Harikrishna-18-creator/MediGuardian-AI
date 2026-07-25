import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [hospitalName, setHospitalName] = useState("MediGuardian AI");
  const [email, setEmail] = useState("admin@mediguardian.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">⚙️ Settings</h2>

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              System Settings
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">Hospital Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Admin Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <label className="form-check-label">
                  Enable Dark Mode
                </label>
              </div>

              <div className="form-check form-switch mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <label className="form-check-label">
                  Email Notifications
                </label>
              </div>

              <button
                className="btn btn-success"
                onClick={handleSave}
              >
                Save Settings
              </button>

            </div>
          </div>

          <div className="card shadow mt-4">

            <div className="card-header bg-dark text-white">
              About Application
            </div>

            <div className="card-body">

              <p><strong>Project:</strong> MediGuardian AI</p>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Developer:</strong> Harikrishna</p>
              <p><strong>Technology:</strong> React + Node.js + Express + MySQL</p>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Settings;