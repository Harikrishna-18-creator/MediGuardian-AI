import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to MediGuardian AI",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "Invalid Email or Password",
      });
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        height: "100vh",
        background: "#f5f7fa",
      }}
    >
      <div className="row h-100">

        {/* Left Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">

          <div style={{ width: "420px" }}>

            <h1 className="text-primary fw-bold">
              🏥 MediGuardian AI
            </h1>

            <h4 className="mb-3">
              Hospital Medicine Inventory System
            </h4>

            <p className="text-muted">
              Smart Inventory Management powered by AI
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">

          <div
            className="card shadow-lg p-4"
            style={{
              width: "420px",
              borderRadius: "15px",
            }}
          >

            <h2 className="text-center mb-4">
              Admin Login
            </h2>

            <form onSubmit={handleSubmit}>
                <motion.div

initial={{ scale: 0.8 }}

animate={{ scale: 1 }}

transition={{ duration: 0.5 }}

>

<form>

...

</form>

</motion.div>

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;