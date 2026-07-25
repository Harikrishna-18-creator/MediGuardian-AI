import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPills,
  FaChartBar,
  FaRobot,
  FaQrcode,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Medicines",
      path: "/medicines",
      icon: <FaPills />,
    },
    {
      title: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      title: "AI Prediction",
      path: "/prediction",
      icon: <FaRobot />,
    },
    {
      title: "QR Code",
      path: "/qrcode",
      icon: <FaQrcode />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div
      className="bg-dark text-white"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <div className="p-4 text-center border-bottom">
        <h3 className="fw-bold text-info">
          MediGuardian AI
        </h3>
        <small>Medicine Management</small>
      </div>

      <ul className="nav flex-column p-3">
        {menuItems.map((item) => (
          <li className="nav-item mb-2" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link rounded d-flex align-items-center ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-light"
                }`
              }
            >
              <span className="me-3 fs-5">
                {item.icon}
              </span>

              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto p-3 border-top">
        <NavLink
          to="/login"
          className="btn btn-danger w-100"
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;