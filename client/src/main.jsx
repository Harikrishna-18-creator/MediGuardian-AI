import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "@fontsource/poppins";

import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ThemeProvider>

      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </ThemeProvider>

  </React.StrictMode>
);