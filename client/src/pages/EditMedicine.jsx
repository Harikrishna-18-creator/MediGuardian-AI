import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function EditMedicine() {
  const { id } = useParams();
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

  useEffect(() => {
    loadMedicine();
  }, []);

  const loadMedicine = async () => {
    try {
      const res = await API.get(`/medicines/${id}`);

      const medicine = res.data.data;

      setFormData({
        medicine_name: medicine.medicine_name || "",
        category: medicine.category || "",
        batch_no: medicine.batch_no || "",
        manufacturer: medicine.manufacturer || "",
        price: medicine.price || "",
        quantity: medicine.quantity || "",
        reorder_level: medicine.reorder_level || "",
        expiry_date: medicine.expiry_date
          ? medicine.expiry_date.substring(0, 10)
          : "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Unable to load medicine");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateMedicine = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/medicines/${id}`, formData);

      toast.success("Medicine Updated Successfully");

      navigate("/medicines");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
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
                  ✏ Edit Medicine
                </h2>

                <form onSubmit={updateMedicine}>

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

                        <option value="Tablet">
                          Tablet
                        </option>

                        <option value="Capsule">
                          Capsule
                        </option>

                        <option value="Syrup">
                          Syrup
                        </option>

                        <option value="Injection">
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
                    className="btn btn-success"
                  >
                    Update Medicine
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

export default EditMedicine;