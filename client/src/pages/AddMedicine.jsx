import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function AddMedicine() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    medicine_name: "",
    category: "",
    batch_no: "",
    manufacturer: "",
    price: "",
    quantity: "",
    reorder_level: "",
    expiry_date: "",
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
      await API.post("/medicines", formData);

      toast.success("Medicine Added Successfully");

      navigate("/medicines");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add medicine");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card shadow">

              <div className="card-body">

                <h2 className="mb-4 fw-bold">
                  ➕ Add Medicine
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Medicine Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="medicine_name"
                        value={formData.medicine_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Category
                      </label>

                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select Category
                        </option>

                        <option>
                          Tablet
                        </option>

                        <option>
                          Capsule
                        </option>

                        <option>
                          Syrup
                        </option>

                        <option>
                          Injection
                        </option>

                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Batch Number
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="batch_no"
                        value={formData.batch_no}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Manufacturer
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">
                        Price
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">
                        Quantity
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">
                        Reorder Level
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        name="reorder_level"
                        value={formData.reorder_level}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">
                        Expiry Date
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Medicine
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary ms-3"
                    onClick={() => navigate("/medicines")}
                  >
                    Cancel
                  </button>

                </form>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </>
  );
}

export default AddMedicine;