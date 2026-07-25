import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaPills,
  FaPlusCircle,
  FaChartBar,
  FaRobot,
  FaQrcode,
  FaCog,
} from "react-icons/fa";

function Sidebar() {

  const [collapse, setCollapse] = useState(false);

  const menus = [

    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      title: "Medicines",
      icon: <FaPills />,
      path: "/medicines",
    },

    {
      title: "Add Medicine",
      icon: <FaPlusCircle />,
      path: "/add",
    },

    {
      title: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },

    {
      title: "AI Prediction",
      icon: <FaRobot />,
      path: "/prediction",
    },

    {
      title: "QR Codes",
      icon: <FaQrcode />,
      path: "/qrcode",
    },

    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },

  ];

  return (

    <div
      className="sidebar text-white"
      style={{
        width: collapse ? "80px" : "260px",
      }}
    >

      <div className="text-center py-3">

        <button
          className="btn btn-light"
          onClick={() => setCollapse(!collapse)}
        >
          <FaBars />
        </button>

      </div>

      {

        menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `d-flex align-items-center p-3 text-white ${
                isActive ? "bg-primary" : ""
              }`
            }
          >

            <span style={{ fontSize: 22 }}>
              {menu.icon}
            </span>

            {!collapse && (

              <span className="ms-3">
                {menu.title}
              </span>

            )}

          </NavLink>

        ))

      }

    </div>

  );
}

export default Sidebar;