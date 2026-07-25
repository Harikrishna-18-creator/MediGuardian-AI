import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <div className="container-fluid">

        <h3 className="text-primary fw-bold">
          🏥 MediGuardian AI
        </h3>

        <div className="d-flex align-items-center">

          <button
            className="btn btn-outline-dark me-3"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <div className="position-relative me-4">
            <FaBell size={22} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
          </div>

          <div className="me-4">
            <FaUserCircle size={30} />
          </div>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;