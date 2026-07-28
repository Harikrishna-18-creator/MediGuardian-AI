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
    purchase_date: "",
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
      const res = await API.post("/medicines", formData);

      toast.success(res.data.message || "Medicine Added Successfully");

      navigate("/medicines");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to add medicine"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
                        placeholder="Enter Medicine Name"
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
                      >
                        <option value="">
                          Select Category
                        </option>

                        <option value="Tablet">
                          Tablet
                        </option>

                        <option value="Capsule">
                          Capsule
                        </option>

                        <option value="Injection">
                          Injection
                        </option>

                        <option value="Syrup">
                          Syrup
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
                        placeholder="Batch Number"
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
                        placeholder="Manufacturer"
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
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Purchase Date
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        name="purchase_date"
                        value={formData.purchase_date}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Expiry Date
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
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
                    className="btn btn-secondary ms-2"
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